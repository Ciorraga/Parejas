
var myImages = ["images/image_0.jpg" , "images/image_1.jpg" , "images/image_2.jpg" , "images/image_3.jpg","images/image_4.jpg","images/image_5.jpg"];
var turn = 1;
var opt1;
var opt2;
var fin = myImages.length;
var aciertos = 0;
var errores = 0;

window.onload = function() {
    elem = document.getElementById("reload");
	elem.addEventListener('click', function(){reload(0,0,1)});
    set_Q();
};

function reload(acierto_new,errores_new,turn_new){
    aciertos=acierto_new;
    errores=errores_new;
    turn = turn_new;
    var rndNumb1 = add_name();
	var rndNumb2 = add_name();
	var rndNumb = rndNumb1.concat(rndNumb2);
    for(i=0;i<myImages.length*2;i++){		
        var elem = document.getElementById("img_"+i)
        elem.setAttribute("src", "images/image_q.jpg");
		elem.setAttribute("name", rndNumb[i]);
    }   
    var elem = document.getElementById("panelShow");
    var elem_sub = document.getElementById("divMuestra");
    var borrado = elem.removeChild(elem_sub);   
}

function set_Q(){
	var rndNumb1 = add_name();
	var rndNumb2 = add_name();
	var rndNumb = rndNumb1.concat(rndNumb2);
	for(i=0;i<myImages.length*2;i++){		
   		var li=document.createElement('li'); 
   		var elem = document.createElement("img");
		elem.setAttribute("src", "images/image_q.jpg");
		elem.setAttribute("name", rndNumb[i]);
		elem.setAttribute("id", "img_"+i);
		elem.setAttribute("class","images_par");
        
		li.appendChild(elem);
		var ul = document.getElementById("set_Q");
		ul.appendChild(li);
		image = document.getElementById("img_"+i);
		event_Click(image.id);
	}	
}

function add_name(){
	var names = new Array();
	for(i=0;i<myImages.length;i++){
		var rnd = Math.floor((Math.random() * myImages.length) + 0); 
		while(names.indexOf(rnd)!=-1){
			var rnd = Math.floor((Math.random() * myImages.length) + 0); 
			var a = names.indexOf(rnd);
		}
		names.push(rnd);
	}
	return names;
}

function event_Click(id){
	elem = document.getElementById(id);
	elem.addEventListener('click', function(){compTurn(this.name,this.id)});
}

function compTurn(name,id){    
	if(turn==1){
		opt1 = name; 
        id1 = id;
        var elem = document.getElementById(id);
        elem.setAttribute("src", myImages[name]);        
	}
	else{
		opt2 = name;
        id2=id;
        var elem = document.getElementById(id);
        elem.setAttribute("src", myImages[name]);   
        compImages(opt1,opt2,id1,id2)
	}
    (turn==2?turn=1:turn=2)	
}

function compImages(name_img1,name_img2,id1,id2){
    if(name_img1==name_img2){
        aciertos++;
        compEnd();
    }
    else{
        errores++;
        setTimeout(function(){ 
            document.getElementById(id1).src = "images/image_q.jpg";
            document.getElementById(id2).src = "images/image_q.jpg";}, 1000);        
    }
}

function compEnd(){
    if(aciertos==fin){        
        var errorText
        (errores==0?errorText="Has conseguido ganar sin tener ni un error!! Vaya fiera estás hecho!!":errorText="Has cometido "+ errores +" errores.");
        var elem = document.getElementById("panelShow");        
        var elemDIV = document.createElement("div");   
        elemDIV.setAttribute("class","panel callout radius");
        elemDIV.setAttribute("id","divMuestra");
        var elemH5 = document.createElement("h5");        
        elemH5.textContent = "Enhorabuena!";
        var elemP = document.createElement("p");
        elemP.textContent = errorText;
        elemDIV.appendChild(elemH5);
        elemDIV.appendChild(elemP);
        elem.appendChild(elemDIV);
        
    }
}
