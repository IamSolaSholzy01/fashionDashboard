import {ChangeEvent, useContext, useEffect, useState} from "react";
import { useRouter } from "next/router";
import { userService } from "../../services";
import styles from "./login.module.scss";
import { motion } from "framer-motion";
import {authStore} from "../../stores/authStore";
export default LoginForm;

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const {state, dispatch} = useContext(authStore)

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push("/");
    }
  }, []);

  const onSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    return userService
      .login(email, password)
      .then(() => {
        setIsLoading(false);
        dispatch({type: 'login'})
        // get return url from query parameters or default to '/'
        const returnUrl = Array.isArray(router.query.returnUrl)
          ? router.query.returnUrl[0]
          : router.query.returnUrl || "/";
        // router.push(returnUrl);
        router.push("/");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
        console.error("apiError", { message: error });
      });
  };

  return (
    <div className="col-md-6 offset-md-3 mt-5">
      <div className={styles.cover_form}>
        <div className={styles.cardBody}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit({email, password})
            }}
          >
            <p className={styles.title}>Student Profile</p>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.error_text}
              >
                {'An error occurred while logging in'}
              </motion.div>
            )}
            <div className={styles.form_group}>
              <label>Email</label>
              <input
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="invalid-feedback"></div>
            </div>
            <div className={styles.form_group}>
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="invalid-feedback"></div>
            </div>
            {/* <button className="btn btn-primary">
              {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
              Login
            </button> */}
            {/*<SubmitBtn btnText="Login" isLoading={isLoading} />*/}
            <button type={'submit'}>Submit</button>
            {/* {errors.apiError &&
                            <div className="alert alert-danger mt-3 mb-0">{errors.apiError?.message}</div>
                        } */}
          </form>
        </div>
      </div>
    </div>
  );
}
