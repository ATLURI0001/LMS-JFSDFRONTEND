import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainNavbar from '../components/MainNavbar';
import "../cssfiles/ContactForm.css";

const ContactForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [disabled, setDisabled] = useState(false);

  const notify = (message, type) => {
    toast(message, {
      type: type,
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onSubmit = async (data) => {
    const formattedData = {
      toEmail: data.email, // Map form email to 'toEmail'
      subject: data.subject,
      message: data.message,
    };
    try {
      setDisabled(true);
      const response = await axios.post('http://localhost:8080/api/email/send', formattedData);
      console.log(response.data);
      notify('Your response has been successfully submitted!', 'success');
    } catch (error) {
      console.error(error);
      notify('Something went wrong. Please try again.', 'error');
    } finally {
      setDisabled(false);
      reset();
    }
  };

  return (
    <div>
      <MainNavbar />
      <div className="ContactForm container">
        <form id="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="row formRow">
            <div className="col-6">
              <input
                type="text"
                {...register('name', { required: 'Please enter your name', maxLength: 30 })}
                className="form-control formInput"
                placeholder="Name"
              />
              {errors.name && <span className="errorMessage">{errors.name.message}</span>}
            </div>
            <div className="col-6">
              <input
                type="email"
                {...register('email', {
                  required: 'Please enter a valid email address',
                  pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
                className="form-control formInput"
                placeholder="Email address"
              />
              {errors.email && <span className="errorMessage">{errors.email.message}</span>}
            </div>
          </div>
          <div className="row formRow">
            <div className="col">
              <input
                type="text"
                {...register('subject', { required: 'Please enter a subject', maxLength: 75 })}
                className="form-control formInput"
                placeholder="Subject"
              />
              {errors.subject && <span className="errorMessage">{errors.subject.message}</span>}
            </div>
          </div>
          <div className="row formRow">
            <div className="col">
              <textarea
                rows={3}
                {...register('message', { required: 'Please enter a message' })}
                className="form-control formInput"
                placeholder="Message"
              />
              {errors.message && <span className="errorMessage">{errors.message.message}</span>}
            </div>
          </div>
          <button className="submit-btn btn btn-primary" disabled={disabled} type="submit">
            Submit
          </button>
        </form>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ContactForm;
