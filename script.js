console.log("SCRIPT RADIO NUEVO CARGADO");

const cleverUrl =
    "https://pxfkqvyhpgbhqvnirinc.supabase.co/functions/v1/clever-handler";


// ==========================================
// ELEMENTOS
// ==========================================

const codigoInput = document.getElementById("codigoRadio");
const vincularButton = document.getElementById("vincularButton");
const estadoVinculacion = document.getElementById("estadoVinculacion");

const radio = document.getElementById("radio");


// ==========================================
// COMPROBAR ELEMENTOS
// ==========================================

console.log("codigoInput:", codigoInput);
console.log("vincularButton:", vincularButton);
console.log("estadoVinculacion:", estadoVinculacion);
console.log("radio:", radio);


// ==========================================
// VINCULAR CÓDIGO
// ==========================================

vincularButton.addEventListener("click", async () => {

    const codigo = codigoInput.value.trim();

    console.log("Código introducido:", codigo);


    // Comprobar código

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
                datos.error || `HTTP ${respuesta.status}`
            );

        }


        estadoVinculacion.textContent =
            "Código encontrado. Esperando confirmación de Roblox...";

        console.log(
            "Solicitud de vinculación enviada correctamente."
        );


    } catch (error) {

        console.error("Error de vinculación:", error);

        estadoVinculacion.textContent =
            "Error: " + error.message;

        vincularButton.disabled = false;

    }

});
