import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import * as yup from "yup";
import { appContext } from "../App";
import { toast } from "react-toastify";

function SignupForm(props) {
  const { serverUrl } = useContext(appContext);
  const { setForm } = props;
  const initialValidationSchema = {
    ownerName: yup.string().required(),
    mobile: yup.string().min(10).required(),
    email: yup.string().min(8).email().required(),
    financeName: yup.string().min(2).required(),
    financeAddress: yup.string().min(10).required(),
    password: yup.string().min(8).required(),
    cpassword: yup
      .string()
      .min(8)
      .required()
      .oneOf([yup.ref("password"), null], "Passwords not matched"),
  };
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        ownerName: "",
        mobile: "",
        email: "",
        financeName: "",
        financeAddress: "",
        password: "",
        cpassword: "",
      },
      validationSchema: yup.object(initialValidationSchema),
      onSubmit: () => signup(values),
    });

  async function signup(values) {
    const response = await fetch(`${serverUrl}/finance/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    // console.log("signup response ", response);
    const data = await response.json();
    // console.log("signup response data", data);
    data.message ===
    "Finance User Created, use the Activation link Sent on mail for Activation"
      ? toast.success(data.message)
      : toast.error(data.message);
  }
  return (
    <>
      <div className="signup-form-container">
        <h2 className="text-center title-small">Finance Registration</h2>
        <form onSubmit={handleSubmit} className="form signup-form">
          <TextField
            id="ownerName"
            type="text"
            label="Owner Name"
            name="ownerName"
            value={values.ownerName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.ownerName && Boolean(errors.ownerName)}
            helperText={
              touched.ownerName && errors.ownerName ? errors.ownerName : null
            }
          />
          <TextField
            id="mobile"
            type="text"
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.mobile && Boolean(errors.mobile)}
            helperText={touched.mobile && errors.mobile ? errors.mobile : null}
          />
          <TextField
            id="email"
            type="text"
            label="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email ? errors.email : null}
          />
          <TextField
            id="financeName"
            type="text"
            label="financeName"
            name="financeName"
            value={values.financeName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.financeName && Boolean(errors.financeName)}
            helperText={
              touched.financeName && errors.financeName
                ? errors.financeName
                : null
            }
          />
          <TextField
            multiline
            id="financeAddress"
            label="Finance Address"
            type="financeAddress"
            name="financeAddress"
            value={values.financeAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.financeAddress && Boolean(errors.financeAddress)}
            helperText={
              touched.financeAddress && errors.financeAddress
                ? errors.financeAddress
                : null
            }
          />

          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={
              touched.password && errors.password ? errors.password : null
            }
          />
          <TextField
            id="cpassword"
            label="Confirm Password"
            type="password"
            name="cpassword"
            value={values.cpassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.cpassword && Boolean(errors.cpassword)}
            helperText={
              touched.cpassword && errors.cpassword ? errors.cpassword : null
            }
          />

          <Button type="submit" variant="contained">
            Submit
          </Button>
          <div className="add-menus d-flex justify-content-between">
            <button
              className="text-danger bg-transparent"
              onClick={() => setForm("login")}
            >
              Already Have Account?
            </button>
          </div>
        </form>
        {/* <pre>{JSON.stringify(errors)}</pre> */}
      </div>
    </>
  );
}

export { SignupForm };
