
export const registration = async (email, password) => {
  const request = JSON.stringify({
    email: email,
    password: password,
  });

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: request,
    redirect: "follow",
  };

  const data = await fetch(
    "http://localhost:5000/api/user/registration",
    requestOptions
  );
  localStorage.setItem("token", data.token);
};

export const login = async (email, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: email,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const data = await fetch(
    "http://localhost:5000/api/user/login",
    requestOptions
  ).then((result) => result.json());
  console.log(data.token);
  localStorage.setItem("token", data.token);
};

export const check = async () => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  console.log(token);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch("http://localhost:5000/api/user/auth", requestOptions)
    .then((response) => response.text())
    .then((result) => result ? true : false)
    .catch((error) => console.log("error", error));
};
