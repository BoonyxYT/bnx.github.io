const mensaje = document.getElementById("mensaje");

const url = "https://pxfkqvyhpgbhqvnirinc.supabase.co/functions/v1/clever-handler";

async function comprobarColor() {
    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        if (datos.color === "rojo") {
            mensaje.textContent = "ROJO";
        } else if (datos.color === "azul") {
            mensaje.textContent = "AZUL";
        } else {
            mensaje.textContent = "Esperando a Roblox...";
        }

    } catch (error) {
        console.error("Error:", error);
        mensaje.textContent = "Error de conexión";
    }
}

comprobarColor();

setInterval(comprobarColor, 1000);
