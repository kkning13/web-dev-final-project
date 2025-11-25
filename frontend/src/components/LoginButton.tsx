import { signIn, signOut } from "../auth/auth";
import { useAuth } from "../auth/AuthUserProvider";

const LoginButton = () => {
  const { user } = useAuth(); // user is null if not logged in

  const handleClick = async () => {
    if (user) {
      await signOut();
    } else {
      await signIn();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {user && <p>Hello, {user.displayName}!</p>}
      <button onClick={handleClick}>
        {user ? "Sign Out" : "Sign In"}
      </button>
    </div>
  );
};

export default LoginButton;
