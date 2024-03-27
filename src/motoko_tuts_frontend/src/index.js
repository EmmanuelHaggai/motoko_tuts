import {
  createActor,
  motoko_tuts_backend,
} from "../../declarations/motoko_tuts_backend";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";

const authClient = await AuthClient.create();
const identity = authClient.getIdentity();

const agent = new HttpAgent({ identity });

let actor;

try {
  actor = createActor(process.env.CANISTER_ID_MOTOKO_TUTS_BACKEND, {
    agent,
  });
} catch (e) {
  actor = motoko_tuts_backend;
}

const loginButton = document.getElementById("login");

loginButton.onclick = async (e) => {
    e.preventDefault();
    let authClient = await AuthClient.create();
    // start the login process and wait for it to finish
    await new Promise((resolve) => {
        authClient.login({
            identityProvider:
                process.env.DFX_NETWORK === "ic"
                    ? "https://identity.ic0.app"
                    : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
            onSuccess: resolve,
        });
    });

    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });

    actor = createActor(process.env.CANISTER_ID_MOTOKO_TUTS_BACKEND, {
        agent,
    });

    document.getElementById('not_loggedin').style.display = 'none';
    document.getElementById('loggedin').style.display = 'block';

    return false;
};


const whoAmIButton = document.getElementById("whoAmI");

whoAmIButton.onclick = async (e) => {
    e.preventDefault();
    whoAmIButton.setAttribute("disabled", true);
    const principal = await actor.whoami();
    whoAmIButton.removeAttribute("disabled");
    document.getElementById("principal").innerText = "Your principal is: "+principal.toString();
    return false;
};

//check if user is already logged in
if (await authClient.isAuthenticated()) {
  document.getElementById('not_loggedin').style.display = 'none';
  document.getElementById('loggedin').style.display = 'block';
  console.log("User is already logged in");
} else {
  console.log("User is not logged in");
}

const logout = document.getElementById("logout");

logout.onclick = async (e) => {
  e.preventDefault();
  const logout = document.getElementById("logout");
  logout.innerText = "Logging out..";
  logout.setAttribute("disabled", true);

  if (authClient) {
    await authClient.logout();
    location.reload();
  }

  return false;
};