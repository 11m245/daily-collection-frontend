import { useContext, useState } from "react";
import { appContext } from "../App";
import { ForgotForm } from "../components/ForgotForm";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";

function Home() {
  const [form, setForm] = useState("login");
  const homeImage = {
    pcUrl:
      "https://www.thebalancemoney.com/thmb/l0KQr3CBNz85XPg3YXxRF2UIaiw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cropped-image-of-hand-putting-coins-in-jars-with-plants-755740897-5ab88ee1875db9003759d390.jpg",
    mobileUrl: "https://www.plannersearch.org/assets/images/lifeevents/300.jpg",
    name: "Daily Savings Logo",
  };
  const { isMobile } = useContext(appContext);
  return (
    <>
      <div className="homepage-container page">
        <h1 className="text-center title-big">Daily Savings App</h1>
        <div className="homepage-body">
          <div
            className="home-image-container"
            style={{ alignSelf: "center", marginInline: "auto" }}
          >
            <img
              src={isMobile ? homeImage.mobileUrl : homeImage.pcUrl}
              alt={homeImage.name}
              style={isMobile ? { width: "200px" } : null}
            />
          </div>
          <div className="home-form-container">
            {form === "login" ? (
              <LoginForm form={form} setForm={setForm} />
            ) : form === "signup" ? (
              <SignupForm form={form} setForm={setForm} />
            ) : form === "forgot" ? (
              <ForgotForm form={form} setForm={setForm} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
export { Home };
