var s = 'ABCDEF'

function encode(p){
    var encrypt = "";
    for (var i=0; i<p.length; i++){
        encrypt += p.charCodeAt(i);
        if (i<p.length-1){
            encrypt += "-";
        } 
    }
    return encrypt;
}

function decode(p){
    var decrypt = "";
    var chunk = ""
    var arr = [];
    console.log(p);
    for (var i=0; i<p.length+1; i++){
        if (p[i] === "-" || i===p.length){
            arr.push(chunk);
            chunk = "";
        } else {
            chunk += p[i];
            console.log(chunk);
        }
    }
    console.log(chunk);
    for (var j=0; j<arr.length; j++){
        decrypt += String.fromCharCode(arr[j]);
    }
    return decrypt;
}

console.log(encode(s));
console.log(decode("65-66-67-68-69-70"));

var array = [74, 97, 118, 97, 115, 99, 114, 105, 112, 116];
var q = "";
for (var j=0; j<array.length; j++){
    q += String.fromCharCode(array[j]);
}
//var q = String.fromCharCode(array);
//console.log(q);

