# find_contain_every_word_on_sql
<body>
<br>
Find thing is on the mysql table.<br>
<br>
var result = scewos(source(Str OR List), sqlCon, tableName, targetStrColumn, targetIDColumn){<br>
<br>
result.data() = {id: text, targetStr: text, match: boolean, matchSource: [sourceStr, ...].tostring}<br>
result.matchCount() = {all: int, match: int}<br>
</body>


