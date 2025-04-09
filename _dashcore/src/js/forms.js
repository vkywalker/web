import {addClass, queryArray, removeClass} from "./utils";
import JustValidate from 'just-validate';
import axios, {HttpStatusCode} from "axios";

const errorsContainerClass = 'invalid-feedback';
const elementForm = "form";
const validationGlobalConfig = {
  errorLabelStyle: '',
  errorFieldCssClass: "border-danger-subtle is-invalid"
};

const forms = queryArray(elementForm);

forms.forEach(form => {
  const validate = new JustValidate(form, validationGlobalConfig);
  const formInputs = form.querySelectorAll('input, select, textarea');

  formInputs.forEach(field => {
    const rules = [];

    if (field.required) {
      rules.push({ rule: "required" });
    }

    if (field.type === "email") {
      rules.push({ rule: "email" });
    }

    if (rules.length > 0) {
      validate.addField(field, rules,{
        errorsContainer: `[name='${field.name}'] + .${errorsContainerClass}`
      });
    }
  });

  // Add a handler when the form has been successfully submitted
  form.addEventListener("form.submitted", (e) => {
    e.target.classList.add("submitted");

    const responseMessage = e.target.nextElementSibling;
    if (responseMessage && e.detail.message) {
      responseMessage.querySelector('.message').innerHTML = e.detail.message;
    }
  });

  // Submit the form
  form.addEventListener('submit', event => {
    let submitProps;
    const isFormValid = form.checkValidity();

    event.preventDefault();
    event.stopPropagation();

    if (!isFormValid) {
      return false;
    }

    const submit = form.querySelector('button[type=submit]');
    if (submit) {
      const loadingText = submit.dataset.loadingText;
      const spinner = submit.querySelector('.spinner');
      const text = submit.querySelector('.text');

      submit.disabled = 'disabled';
      submitProps = {
        target: text,
        text: text.innerHTML,
        spinner
      };

      if (text && loadingText) {
        text.innerHTML = loadingText;
      }

      if (spinner) {
        removeClass(spinner, "d-none");
      }
    }

    axios
      .post(form.action, form, { headers: {
          'Content-Type': 'application/json'
        }})
      .then(function (response) {
        if (response.status === HttpStatusCode.Ok) {
          form.dispatchEvent(
            new CustomEvent("form.submitted", { detail: response.data }),
          );
        }
      })
      .catch(function (error) {
        // console.log(error);
      })
      .finally(() => {
        if (submit) {
          submit.removeAttribute('disabled');

          if (submitProps) {
            submitProps.target.innerHTML = submitProps.text;
            addClass(submitProps.spinner, "d-none");
          }
        }
      });
  }, false);
});
