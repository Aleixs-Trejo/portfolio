// Preact
import { signal } from "@preact/signals";
import type { JSX } from "preact/jsx-runtime";

// Assets
import iconLoad from "@assets/icon/icon-loading.svg";
import iconError from "@assets/icon/icon-error-outline.svg";
import iconCheck from "@assets/icon/icon-check-outline.svg";

const initialStateForm = {
  nombre: "",
  email: "",
  mensaje: "",
};

const form = signal(initialStateForm);
const loading = signal(false);
const error = signal(false);
const success = signal(false);
const showToast = signal(false);

const FormContact = () => {
  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    form.value = { ...form.value, [target.name]: target.value };
  };

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }

    if (loading.value) return;
    loading.value = true;
    error.value = false;
    success.value = false;

    const formData = new FormData();
    formData.append("nombre", form.value.nombre);
    formData.append("email", form.value.email);
    formData.append("mensaje", form.value.mensaje);
    formData.append("_captcha", "false");

    try {
      const response = await fetch("https://formsubmit.co/alexistrejoxd@gmail.com", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        error.value = true;
        throw new Error("Ocurrió un error, intente nuevamente");
      }

      success.value = true;
      form.value = initialStateForm;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
        success.value = false;
        error.value = false;
      }, 1500)
    }
  };

  return (
    <form
      class="w-full grid gap-6 md:grid-cols-2 md:gap-12"
      onSubmit={handleSubmit}
    >
      <article class="flex relative h-10 anim-fade-viewport overflow-visible">
        <input
          type="text"
          name="nombre"
          id="nombre"
          class="form__input w-full bg-transparent text-gray-200 text-base px-1 py-2 outline-none border-b-1 border-b-gray-500"
          placeholder=" "
          required
          title="Nombre solo puede contener letras y espacios"
          onChange={handleChange}
        />
        <label
          htmlFor="nombre"
          class="cursor-pointer text-gray-500 absolute top-2 left-2 transition-all duration-300 ease-in-out"
        >
          Nombre:
        </label>
        <span
          class="form__input--line absolute bottom-0 left-0 w-full h-0.25 transform origin-left transition-transform duration-300 ease-in-out"
        ></span>
      </article>
      <article class="flex relative h-10 anim-fade-viewport overflow-visible">
        <input
          type="email"
          name="email"
          id="email"
          class="form__input w-full bg-transparent text-gray-200 text-base px-1 py-2 outline-none border-b-1 border-b-gray-500"
          placeholder=" "
          required
          title="Correo inválido"
          onChange={handleChange}
        />
        <label
          htmlFor="email"
          class="cursor-pointer text-gray-500 absolute top-2 left-2 transition-all duration-300 ease-in-out"
        >
          Correo:
        </label>
        <span
          class="form__input--line absolute bottom-0 left-0 w-full h-0.25 transform origin-left transition-transform duration-300 ease-in-out"
        ></span>
      </article>
      <article class="flex relative min-h-25 anim-fade-viewport overflow-visible col-span-2">
        <textarea
          name="mensaje"
          id="mensaje"
          class="form__input w-full bg-transparent text-gray-200 text-base px-1 py-2 outline-none border-b-1 border-b-gray-500"
          placeholder=" "
          required
          onChange={handleChange}
          title="Escribe tu mensaje"></textarea>
        <label
          htmlFor="mensaje"
          class="cursor-pointer text-gray-500 absolute top-2 left-2 transition-all duration-300 ease-in-out"
        >
          Mensaje:
        </label>
        <span
          class="form__input--line absolute bottom-0 left-0 w-full h-0.25 transform origin-left transition-transform duration-300 ease-in-out"
        ></span>
      </article>
      <button
        disabled={loading.value}
        type="submit"
        class="w-full bg-cyan-primary text-white text-base rounded-xl p-2 cursor-pointer anim-fade-viewport overflow-visible col-span-2"
        >
        {loading.value ? "Enviando..." : "Enviar"}
      </button>
      {showToast.value && (
        <div class="flex justify-center items-center gap-3 p-3 rounded-md text-white transition-all duration-300">
          {loading.value && <img src={iconLoad.src} alt="Loading" class="w-6 h-6 object-contain object-center" />}
          {error.value && <img src={iconError.src} alt="Error" class="w-6 h-6 object-contain object-center" />}
          {success.value && <img src={iconCheck.src} alt="Success" class="w-6 h-6 object-contain object-center" />}
          <p class="text-sm">
            {loading.value && "Enviando..."}
            {error.value && "Ocurrió un error, intente nuevamente"}
            {success.value && "¡Mensaje enviado exitosamente!"}
          </p>
        </div>
      )}
    </form>
  );
};

export default FormContact;