import { useNavigate } from "react-router-dom";

function LoginComponent() {

    const transferTo = useNavigate();

    const HandleUserLogin = (e) => {
        e.preventDefault();

        const Payload = {
            email: e.target.email.value,
            password: e.target.password.value,
        };

        const dummyUser1 = {
            email: "user1@gmail.com",
            password: "user1@Test",
        };

        const dummyUser2 = {
            email: "user2@gmail.com",
            password: "user2@Test",
        };

        if (Payload.email === dummyUser1.email && Payload.password === dummyUser1.password
            || Payload.email === dummyUser2.email && Payload.password === dummyUser2.password) {

            localStorage.setItem("Customer", "user Authenticated");

            transferTo("/products", {
                replace: true
            })
        } else {
            alert('invalid credentials');
            e.target.email.value = "";
            e.target.password.value = "";
            return;


        }

    }


    return (
        <div className="login-background">
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-md-6 m-5 shadow-3">
                        <div className="card bg-light p-4">
                            <h2 className="card-title text-info text-center ">Signin</h2>

                            <form onSubmit={HandleUserLogin}>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="enter email"
                                        name="email"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="enter password"
                                        name="password"
                                        required
                                    />
                                </div>
                                <p className="lead text-center">Signin before you purchase a Product</p>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-info">
                                        <i className="fa fa-lock"></i>&nbsp; Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default LoginComponent;