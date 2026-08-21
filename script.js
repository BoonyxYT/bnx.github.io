console.log("SCRIPT RADIO CARGADO");

const cleverUrl =
    "https://pxfkqvyhpgbhqvnirinc.supabase.co/functions/v1/clever-handler";


// ==========================================
// ELEMENTOS DE LA WEB
// ==========================================

const codigoInput = document.getElementById("codigoRadio");
const vincularButton = document.getElementById("vincularButton");
const estadoVinculacion = document.getElementById("estadoVinculacion");

const radio = document.getElementById("radio");


// ==========================================
// COMPROBAR QUE EXISTEN LOS ELEMENTOS
// ==========================================

console.log("Input:", codigoInput);
console.log("Botón:", vincularButton);
console.log("Estado:", estadoVinculacion);
console.log("Radio:", radio);


// ==========================================
// VINCULAR CÓDIGO
// ==========================================

vincularButton.addEventListener("click", async () => {

    const codigo = codigoInput.value.trim();

    console.log("Código introducido:", codigo);


    // Comprobar formato

    if (!/^\d{6}$/.test(codigo)) {

        estadoVinculacion.textContent =
            "Introduce un código válido de 6 dígitos.";

        return;
    }


    estadoVinculacion.textContent =
        "Comprobando código...";

    vincularButton.disabled = true;


    try {

        const respuesta = await fetch(cleverUrl, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                action: "request_link",
                code: codigo
            })

        });


        const datos = await respuesta.json();

        console.log("Respuesta de Supabase:", datos);


        if (!respuesta.ok || !datos.success) {

            throw new Error(
                datos.error || "No se pudo vincular el código."
            );

        }


        estadoVinculacion.textContent =
            "Código encontrado. Esperando confirmación de Roblox...";


        /*
         * Aquí NO creamos ninguna radio_session.
         *
         * La web solamente ha puesto:
         *
         * link_requested = true
         *
         * Roblox será quien confirme la vinculación.
         */


    } catch (error) {

        console.error("Error de vinculación:", error);

        estadoVinculacion.textContent =
            "Error: " + error.message;

        vincularButton.disabled = false;

    }

});
