import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store.js";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Stripe Publishable Key (frontend .env)
const STRIPE_PK_KEY = import.meta.env.VITE_STRIPE_PK_KEY;
const stripePromise = loadStripe(STRIPE_PK_KEY);

// Clerk Publishable Key (frontend .env)
const CLERK_PK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PK_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}
if (!STRIPE_PK_KEY) {
  throw new Error("Add your Stripe Publishable Key to the .env file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={CLERK_PK_KEY}>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
