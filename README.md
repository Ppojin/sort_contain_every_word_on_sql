# find_contain_every_word_on_sql

Find thing is on the mysql table.

function scewos(sourceStrList, sqlCon, tableName, targetStrColumn, targetIDColumn){
    ...
}

return is json list 
.data() = {id, targetStr, match, matchSource: [sourceStr, ...]}
.count() = {all: int, match: int, unmatch: int}
