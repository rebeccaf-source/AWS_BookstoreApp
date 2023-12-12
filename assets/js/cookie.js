const existingIdTokenCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('id_token='));
const params = window.location.hash.substring(1).split('&');

let idToken = null;

for (const param of params) {
    if (param.startsWith('id_token=')) {
        idToken = param.split('=')[1];
    }
}

if (idToken && !existingIdTokenCookie) {
    const secureFlag = "secure";
    document.cookie = `id_token=${idToken}; ${secureFlag}; path=/`;
    window.location.replace(window.location.pathname);
} 

if(existingIdTokenCookie) {
    setValueToElement('home-user', 'Welcome ' + getValueFromJWT("id_token","cognito:username") + "!");
}


function printJWT(cookie) {
    const jwtParts = cookie.split('.');
    if (jwtParts.length === 3) {
        const jwtPayload = JSON.parse(atob(jwtParts[1])); 
        console.log(jwtPayload);
    } else {
        console.error("Invalid JWT format");
    }
} 

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
        return decodeURIComponent(cookieValue);
        }
    }
    return null; 
}


function getValueFromJWT(cookieName, fieldName) {
    const jwtCookie = getCookie(cookieName);
    if (jwtCookie) {
        const parts = jwtCookie.split('.');
        if (parts.length === 3) {
        
        const decodedPayload = atob(parts[1]);
        const payloadData = JSON.parse(decodedPayload);
        
            if (payloadData[fieldName]) {
                return payloadData[fieldName];
            }
        }
    }
    return null; 
    }
    

function setValueToElement(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    } else {
        console.error(`Element with ID "${elementId}" not found.`);
    }
}