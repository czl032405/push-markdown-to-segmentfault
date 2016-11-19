```javascript
function fun(a){
    if(a=="x"){
        doX();
    }
    else if(a=="y"){
        doy();
    }
    else{
        doElse();
    }
}

function fun2(a){
    var lookUp={x:dox,y:doy},def=doElse;
    (lookUp[a]||def)();
}
function fun3(a){
    ({x:dox,y:doy}[a]||def)();
}


```