import { useMoralis } from "react-moralis";
import Link from "next/link"

const NavBar = () => {

    const {
        authenticate,
        isAuthenticated,
        isAuthenticating,
        user,
        account,
        logout,
    } = useMoralis();

    const login = async () => {
        if (!isAuthenticated) {
            await authenticate({ signingMessage: "Log in using Moralis" })
                .then(function (user) {
                    console.log("logged in user:", user);
                    console.log(user.get("ethAddress"));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    // const logOut = async () => {
    //     await logout();
    //     console.log("logged out");
    // };


    return (

        <nav>
            <div className="logo">
                <h1>RPS Crypto</h1>
            </div>
            <Link href={'/'}><a>Home</a></Link>
            <Link href={'/game/game'}><a>Game</a></Link>
            <Link href={'/about'}><a>About</a></Link>
            <Link href={'/'}><a>Login</a></Link>
            <button onClick={login}>Connect Metamask</button>
        </nav>

    );
}

export default NavBar;