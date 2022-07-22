import React, { useState, useRef, useMemo } from "react";
import style from "./Auth.module.scss";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { registration, login, check } from "../../server/auth";
import { MdWbSunny } from "react-icons/md";
import { FiMoon } from "react-icons/fi";

export default function Auth({ setIsAuth, colourMode, setColourMode }) {
    const [isRegister, setIsRegister] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    const inputLoginRegisterRef = useRef();
    const inputRegisterRef = useRef();
    const inputLoginRef = useRef();
    const colour = useMemo(() => {
        return {
            color: colourMode === "white" ? "black" : "white",
            backgroundColor: colourMode,
            borderColor: colourMode === "white" ? "black" : "white",
        };
    }, [colourMode]);


    function submit() {
        const loginRef = inputLoginRef.current;
        const firstInput = inputLoginRegisterRef.current;
        if (checkValid()) {
            if (isRegister) {
                registration(loginRef.value, firstInput.value);
                setIsRegister(!isRegister);
            } else {
                login(loginRef.value, firstInput.value);
                setIsAuth(async () => await check());
            }
        }
    }
    function checkValid() {
        const loginRef = inputLoginRef.current;
        const firstInput = inputLoginRegisterRef.current;
        const secondInput = inputRegisterRef.current;

        const validBoolPassword = isRegister
            ? firstInput.value === secondInput.value &&
              firstInput.value.length >= 8 &&
              secondInput.value.length >= 8
            : firstInput.value.length >= 8;
        const validBoolLogin = loginRef.value.length > 3;

        loginRef.style.borderColor = validBoolLogin ? "green" : "red";
        firstInput.style.borderColor = firstInput.value.length
            ? validBoolPassword
                ? "green"
                : "red"
            : null;
        secondInput.style.borderColor = isRegister
            ? secondInput.value.length
                ? validBoolPassword
                    ? "green"
                    : "red"
                : null
            : null;

        return validBoolPassword && validBoolLogin;
    }
    function inputPasswd(placeholder, inputReference) {
        return (
            <div
                style={colour}
                className={style.wrapper__container__input__password}
            >
                <input
                    style={colour}
                    ref={inputReference}
                    onChange={() => checkValid()}
                    type={isVisible ? "text" : "password"}
                    placeholder={placeholder}
                />
                <div
                    className={
                        style.wrapper__container__input__password__toggle
                    }
                    onClick={() => setIsVisible(!isVisible)}
                >
                    {isVisible ? (
                        <AiFillEyeInvisible
                            style={{
                                color:
                                    colourMode === "white" ? "black" : "white",
                                backgroundColor:
                                    colourMode === "white" ? "white" : "black",
                            }}
                        />
                    ) : (
                        <AiFillEye
                            style={{
                                color:
                                    colourMode === "white" ? "black" : "white",
                                backgroundColor:
                                    colourMode === "white" ? "white" : "black",
                            }}
                        />
                    )}
                </div>
            </div>
        );
    }
    return (
        <div style={{ backgroundColor: colourMode }} className={style.wrapper}>
            <div style={colour} className={style.wrapper__container}>
                <div style={colour} className={style.wrapper__container__head}>
                    {isRegister ? (
                        <h2 style={colour}>Registration</h2>
                    ) : (
                        <h2 style={colour}>Login</h2>
                    )}
                    <div
                        className={style.wrapper__container__head__btn__theme}
                        style={colour}
                        onClick={() => {
                            setColourMode();
                        }}
                    >
                        {colourMode === "white" ? (
                            <MdWbSunny style={colour} />
                        ) : (
                            <FiMoon style={colour} />
                        )}
                    </div>
                </div>

                <div
                    style={colour}
                    className={style.wrapper__container__input__login}
                >
                    <input
                        ref={inputLoginRef}
                        onChange={() => checkValid()}
                        type={"text"}
                        style={colour}
                        placeholder={"login(min 3 characters)"}
                    />
                </div>
                {inputPasswd("password (8 characters)", inputLoginRegisterRef)}
                {isRegister ? (
                    inputPasswd("password (8 characters)", inputRegisterRef)
                ) : (
                    <div style={{ display: "none" }}>
                        {inputPasswd(
                            "password (8 characters)",
                            inputRegisterRef
                        )}
                    </div>
                )}
                <button
                    onClick={submit}
                    className={style.wrapper__container__sbmt__btn}
                    style={colour}
                >
                    {isRegister ? <>Registration</> : <>Login</>}
                </button>
                <button
                    onClick={() => setIsRegister(!isRegister)}
                    className={style.wrapper__container__have_acc_btn}
                    style={colour}
                >
                    {isRegister
                        ? "Already have an account"
                        : "Don't have an account"}
                </button>
            </div>
        </div>
    );
}
