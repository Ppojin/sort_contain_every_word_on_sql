var MyLib = {};

// 모든 함수에 메모이제이션 기능 추가
// isPrime = isPrime.memoize();
// isPrime(3);  -> 캐시 O
Function.prototype.memoize = function(){
  var fn = this;
  return function(){
    return fn.memoization.apply(fn, arguments);
  };
};

// 모든 함수에 메모이제이션 기능 추가
// isPrime(3);  -> 캐시 X
// isPrime.memoization(1000000007); -> 캐시 O
Function.prototype.memoization = function(key){
  // 캐시를 위한 코드 추가
  this.cache = this.cache || {};
  if(this.cache[key] != undefined){
    // 캐시가 된 상태
    return this.cache[key];
  }else{
    // 캐시를 위한 코드 추가
    return this.cache[key] = this.apply(this, arguments);
  }
};

// 부분적용함수
// var minUnder100 = Math.min.mycurry(100);
// minUnder100(1000, 500, 300, 400);// 100
// var maxAbove10 = Math.max.mycurry(10);
Function.prototype.mycurry = function(){
  var fn = this;  // Math.min
  // [100]
  var preArgs = Array.prototype.slice.call(arguments);
  return function(){
    // [1000, 500, 300, 400]
    var callArgs = Array.prototype.slice.call(arguments);
    // [100, 1000, 500, 300, 400]
    var args = preArgs.concat(callArgs);
    // Math.min(100, 1000, 500, 300, 400);
    return fn.apply(this, args);
  };  
};

// Child가 Parent를 상속받는다.
MyLib.inherite = function(Parent, Child){
  var F = function(){};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
};

// firstLi.remove()
// 해당 요소를 제거한다.
if(!Element.prototype.remove){
  Element.prototype.remove = function(){
    this.parentNode.removeChild(this);
  };
}

MyLib.getJSON = function(url, data, success){
  MyLib.get(url, data, success, 'json');
};

/*
  MyLib.get('/time', 'msg=get-1', append);
  MyLib.get('/time?msg=get-2', append);
  MyLib.get('/time', 'msg=get-3');
  MyLib.get('/time?msg=get-4');
*/
// 오버로딩
//  - 함수 중복 정의
//  - 하나의 함수에서 매개변수의 타입(typeof, instanceof)
//      , 개수(arguments.length), 순서 등을
//      구분하서 다르게 동작
// get 방식의 ajax 요청
MyLib.get = function(url, data, success, dataType){
  var options = {dataType: dataType};
  if(typeof data == 'string'){
    options.data = data;
    options.success = success;
  }else{
    options.success = data;
  }  
  MyLib.requestAjax(url, options);
};

// var requestAjax = function(url, method, async, data, dataType, success){
MyLib.requestAjax = function(url, options){
  options = options || {};
  options.method = options.method || 'get';
  if(options.async == undefined){
    options.async = true;
  }
  options.data = options.data || '';
  options.dataType = options.dataType || 'text';

  if(options.method.toLowerCase() == 'get' && options.data){
    url += '?' + options.data;
    options.data = '';
  }
  // 1. XMLHttpRequest 생성
  var xhr = new XMLHttpRequest();		
  // 2. 요청준비(open())
  xhr.open(options.method, url, options.async);
  if(options.success){
      xhr.onload = function(){
      // 4. 응답 데이터 처리
      var result = xhr.responseText;
      if(options.dataType.toLowerCase() == 'json'){
        result = JSON.parse(result);
      }
      options.success(result);
    };
  }
  // 3. 요청(send())
  xhr.send(options.data);
};