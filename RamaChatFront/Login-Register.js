function llistapaisos() {
    var http = new XMLHttpRequest();
  
    http.open("GET", "http://localhost:8067/RamaChat/Register", true);
    //http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
            json = JSON.parse(http.response);
            var paisesselect = document.getElementById("paises");
            for (var i = 0; i < json.length; i++) {
            nombre = json[i].name;
            codigo = json[i].code;
            var option = document.createElement("option");
            option.text = nombre;
            option.value = codigo;
            paisesselect.appendChild(option);
  
          }
        }
      }
      http.send();
    }
    
  function register(){
    var http = new XMLHttpRequest();
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var mail = document.getElementById("mail").value;
    var codeCountry = document.getElementById("paises").value;
    var confirmarcontra = document.getElementById("confirmarpass").value;

    http.open("POST", "http://localhost:8067/RamaChat/Register", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    http.onreadystatechange = function () {
      document.getElementById("user").value = "";
      document.getElementById("pass").value = "";
      document.getElementById("mail").value = "";
      document.getElementById("paises").value = "";
      var respuesta = http.response;
      document.getElementById("confirmarpass").value = "";
      if (http.readyState == 4 && http.status == 200) {
          if (pass == confirmarcontra){  
              if (respuesta == 'true') {
                console.log("Success register");
                window.location.href = 'Login.html';
              
              }
            } else window.alert("La contraseña y la confirmacion no son iguales")
        }
      }

      http.send("user=" + user +"&pass=" + pass + "&mail=" + mail + "&codeCountry="+ codeCountry);

    }
  

    function Login() {
      var http = new XMLHttpRequest();
      var mail = document.getElementById("correo").value;
      var pass = document.getElementById("password").value;
      
      
      

      http.open("GET", "http://localhost:8067/RamaChat/Login?mail=" + mail + "&pass= " + pass , true);
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      

      http.onreadystatechange = function () {
        var respuesta = http.response;
        if (http.readyState == 4 && http.status == 200) {
              document.getElementById("correo").value = "";
              document.getElementById("password").value = "";
              if(respuesta == 'false') {
                document.getElementById("resultat").innerHTML = "Las credenciales son incorrectas"; 
              }else {
                sessionStorage.setItem("correo", mail);
                sessionStorage.setItem("session", respuesta);
                window.location.href = 'chat.html';
              }

        }
      }
        http.send();
    }


    function cerrarsesion(){
    
        sessionStorage.removeItem("correo");
        sessionStorage.removeItem("session");
        window.location.href = "login.html";
     
    }



    function rebrellistaamigos(){
      var http = new XMLHttpRequest();
      var mail = sessionStorage.getItem("correo");
      var session = sessionStorage.getItem("session");
      
      http.open("GET", "http://localhost:8067/RamaChat/Friend?mail=" + mail + "&session= " + session , true);
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      

      http.onreadystatechange = function () {
        var respuesta = http.response;
        var listaamigos = document.getElementById("listaamigos");
        if (http.readyState == 4 && http.status == 200) {
              if(respuesta == "false"){
                sessionStorage.removeItem("correo");
                sessionStorage.removeItem("session");
                window.location.href = "Login.html";
              }

              var json = JSON.parse(respuesta);  
              for (var i = 0; i < json.length; i++) {
                var valamigo = json[i].gmail;  
                var option = document.createElement("option");
                option.value = valamigo;
                option.text = valamigo;
                listaamigos.appendChild(option);
              }
              

        }
      }
        http.send();
        
     
    }
    

function agregar_amigos(){
  var http = new XMLHttpRequest();
  var mail = sessionStorage.getItem("correo");
  var session = sessionStorage.getItem("session");
  var emailamigo = document.getElementById("emailamigo").value;
  http.open("POST", "http://localhost:8067/RamaChat/Friend", true);
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      

      http.onreadystatechange = function () {
        var respuesta = http.response;
        var mail = sessionStorage.getItem("correo");
        var session = sessionStorage.getItem("session");
        if (http.readyState == 4 && http.status == 200) {
          if (respuesta == 0) {
            document.getElementById("erroramigos").innerHTML = "El servidor no responde";
          }
          if (respuesta == 1) {
            window.location.reload();
            document.getElementById("erroramigos").innerHTML = "Amigo Agregado correctamente";
            
            
          }

          if (respuesta == 2){
            document.getElementById("erroramigos").innerHTML = "Amigo no encontrado";
          }
          
          if (respuesta == 3){
            document.getElementById("erroramigos").innerHTML = "El codigo de session ha expirado";
            
            
          }
        }

      }
      http.send("mail=" + mail + "&session=" + session + "&friend=" + emailamigo);
    }


function enviarmensaje(){
  var http = new XMLHttpRequest();
  var mail = sessionStorage.getItem("correo");
  var session = sessionStorage.getItem("session");
  var emailamigo = document.getElementById("listaamigos").value;
  var sms = document.getElementById("mensaje").value;
  http.open("POST", "http://localhost:8067/RamaChat/Xat", true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      

  http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var chat = document.getElementById("conversations");
            var mensaje = document.createElement("div");
            mensaje.id = "mensajemio";
            mensaje.innerHTML = "Tu ---> "+ emailamigo + " : " + sms;
            chat.appendChild(mensaje);
            document.getElementById("mensaje").value = "";
        }
      }
      http.send("mail=" + mail + "&session=" + session + "&receptor=" + emailamigo + "&sms=" + sms);


    }



function rebremensajes() {
      var mail = sessionStorage.getItem("correo");
      var session = sessionStorage.getItem("session");     
      var http = new XMLHttpRequest();
      
      http.open("GET","http://localhost:8067/RamaChat/Xat?mail=" + mail + "&session=" + session , true);
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
          if(http.responseText != "null") {
            var respuesta = JSON.parse(http.responseText);
            var emisor = respuesta[0].emisor;
            var texto = respuesta[0].sms;
            var mensajes = document.createElement("div");
            mensajes.id = "mensajeajeno";
            mensajes.innerHTML = emisor + " : " +  texto;
            var chat = document.getElementById("conversations");
            chat.appendChild(mensajes);
          }


          
        }
      };
      http.send();
      
    }

   setInterval(rebremensajes, 1000);
    
