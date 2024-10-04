import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Anna",
          from_email: form.email,
          to_email: import.meta.env.VITE_TO_EMAIL,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setLoading(false);
      alert("Your message has been sent!");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Something went wrong.");
    }
  };

  return (
    <section
      id="contact"
      className="c-space my-20 h-full flex items-center justify-center flex-col"
      style={{
        backgroundImage: `url('/assets/terminal.png')`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "1200px",
      }}
    >
      <div className="contact-container">
        <h3 className="head-text">Let&apos;s talk</h3>
        <p className="text-lg text-white-600 mt-3">
          Have a project in mind or just want to say hello?
          <br />
          Feel free to reach out — I'd love to hear from you!
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col space-y-7"
        >
          <label className="space-y-3">
            <span className="field-label">Full Name</span>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="field-input"
              placeholder="Full Name"
            />
          </label>
          <label className="space-y-3">
            <span className="field-label">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="field-input"
              placeholder="Email"
            />
          </label>
          <label className="space-y-3">
            <span className="field-label">Your Message</span>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="field-input"
              placeholder="Hi, I'm interested in..."
            />
          </label>

          <button type="submit" className="field-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}

            <img
              src="/assets/arrow-up.png"
              alt="arrow up"
              className="field-btn-arrow"
            />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
