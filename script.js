const button = document.getElementById("supabaseButton");
const mensaje = document.getElementById("mensaje");

const url = "https://pxfkqvyhpgbhqvnirinc.supabase.co/functions/v1/clever-handler";

button.addEventListener("click", async () => {
    mensaje.textContent = "Conectando con Supabase...";

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        mensaje.textContent = datos.mensaje;
    } catch (error) {
        console.error(error);
        mensaje.textContent = "Error al conectar con Supabase.";
    }
});
