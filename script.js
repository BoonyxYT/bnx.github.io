const mensaje = document.getElementById("mensaje");
const radio = document.getElementById("radio");

const url = "https://pxfkqvyhpgbhqvnirinc.supabase.co/functions/v1/clever-handler";

let colorAnterior = null;

async function comprobarColor() {
    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        console.log("Respuesta:", datos);

        if (datos.color === "rojo") {

            mensaje.textContent = "ROJO";

            if (colorAnterior !== "rojo") {
                radio.src = "./audio/rojo.mp3";
                radio.load();
            }

        } else if (datos.color === "azul") {

            mensaje.textContent = "AZUL";

            if (colorAnterior !== "azul") {
                radio.src = "./audio/azul.mp3";
                radio.load();
            }

        } else {

            mensaje.textContent = "Esperando a Roblox...";
        }

        colorAnterior = datos.color;

    } catch (error) {

        console.error("Error:", error);
        mensaje.textContent = "Error de conexión";

    }
}

comprobarColor();

setInterval(comprobarColor, 1000);
