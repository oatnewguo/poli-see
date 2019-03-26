/* 

THIS FILE IS RESERVED FOR GLOBAL REQUIRED JS

Please do not include javascript that has external dependencies.

*/

function setCookie(c_name,value,path,expDate)
{
   var c_value = escape(value);
   if ((typeof path !== 'undefined') && (path != null))
   {
      c_value += ";path=" + path;
   }
   if ((typeof expDate !== 'undefined') && (expDate != null))
   {
      c_value += ";expires=" + expDate.toUTCString();
   }
   document.cookie=c_name + "=" + c_value;

}

function getCookie(c_name)
{
   var i,x,y,ARRcookies=document.cookie.split(";");
   for (i=0;i<ARRcookies.length;i++)
   {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==c_name)
      {
         return unescape(y);
      }
   }
   return null;
}

function deleteCookie(c_name, path) {
   setCookie(c_name, null, path, new Date(0));
}

function openOAuthPopup(url,callback)
{  
   var popupWindow = window.open(url, "oauthPopup", "height=550,width=780");
   
   if (typeof callback !== "undefined")
   {
      var timer = setInterval(function() {
         if(popupWindow.closed)
         {
            clearTimeout(timer);
            callback();
         }
      }, 1000);
   }
}


function oAuthDisconnect(disconnectUrl,callback) {             
   $.get(disconnectUrl,callback);
}

function emailCheck(emailStr)
{
   var checkTLD=1;
   var knownDomsPat=/^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum|cat|asia|mobi|xxx|scot)$/i;
   var emailPat=/^(.+)@(.+)$/;
   var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
   var validChars="\[^\\s" + specialChars + "\]";
   var quotedUser="(\"[^\"]*\")";
   var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
   var atom=validChars + '+';
   var word="(" + atom + "|" + quotedUser + ")";
   var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
   var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");
   var matchArray=emailStr.match(emailPat);

   if (matchArray==null)
   {
      return false;
   }
   
   var user=matchArray[1];
   var domain=matchArray[2];

   for (i=0; i<user.length; i++)
   {
      if (user.charCodeAt(i)>127)
      {
         return false;
      }
   }
   
   for (i=0; i<domain.length; i++)
   {
      if (domain.charCodeAt(i)>127)
      {
         return false;
      }
   }

   if (user.match(userPat) == null)
   {
      return false;
   }

   var IPArray=domain.match(ipDomainPat);

   if (IPArray!=null)
   {
      for (var i=1;i<=4;i++)
      {
         if (IPArray[i]>255)
         {
            return false;
         }
      }
      return true;
   }

   var atomPat=new RegExp("^" + atom + "$");
   var domArr=domain.split(".");
   var len=domArr.length;

   for (i=0;i<len;i++)
   {
      if (domArr[i].search(atomPat) == -1)
      {
         return false;
      }
   }

   if (checkTLD && domArr[domArr.length-1].length!=2 && domArr[domArr.length-1].search(knownDomsPat)==-1)
   {
      return false;
   }

   if (len<2)
   {
      return false;
   }

   return true;
}