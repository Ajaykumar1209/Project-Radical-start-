import React, { Component } from "react";
import style from './taskform.module.css';
import TaskView from "./TaskView";

class TaskForm extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            flag: false,
            errors: {}
        };
        this.fnameRef = React.createRef()
        this.lnameRef = React.createRef()
        this.locationRef = React.createRef()
        this.emailRef = React.createRef()
        this.dobRef = React.createRef()
        this.educationRef = React.createRef()
        this.aboutRef = React.createRef()
        this.idRef = React.createRef()
    }
    compareData=()=>{
        const isValid = this.validateForm();
        if (isValid) {
            if (this.state.flag === true) {
                this.editData()
            }
            else {
                this.postData()
            }
            this.setState({
                flag: false
            })
        }
    }
    validateForm = () => {
        const errors = {};
        let formIsValid = true;

        if (!this.fnameRef.current.value) {
            formIsValid = false;
            errors["firstName"] = "First name is required";
        }

        if (!this.lnameRef.current.value) {
            formIsValid = false;
            errors["lastName"] = "Last name is required";
        }

        if (!this.locationRef.current.value) {
            formIsValid = false;
            errors["location"] = "Location is required";
        }

        if (!this.emailRef.current.value) {
            formIsValid = false;
            errors["email"] = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(this.emailRef.current.value)) {
            formIsValid = false;
            errors["email"] = "Email is invalid";
        }

        if (!this.dobRef.current.value) {
            formIsValid = false;
            errors["dob"] = "Date of birth is required";
        }

        if (!this.educationRef.current.value) {
            formIsValid = false;
            errors["education"] = "Education is required";
        }

        if (!this.aboutRef.current.value) {
            formIsValid = false;
            errors["about"] = "About is required";
        }

        this.setState({ errors });
        return formIsValid;
    };

    submitButton = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            console.log("Form submitted successfully");
        }
    };

    display = (username, myFlag) => {
        console.log(myFlag)
        this.setState({
            flag: myFlag
        })
        fetch("http://localhost:3000/data/" + username)
            .then((res) => res.json())
            .then((response) => {
                this.fnameRef.current.value = response[0].firstname
                this.lnameRef.current.value = response[0].lastname
                this.locationRef.current.value = response[0].location
                this.emailRef.current.value = response[0].email
                this.dobRef.current.value = response[0].dob
                this.educationRef.current.value = response[0].education
                this.aboutRef.current.value = response[0].about
                console.log(response)
            })
        console.log(username)
    }

    editData = (username) => {
        let postData1 = {
            "firstName": this.fnameRef.current.value,
            "lastName": this.lnameRef.current.value,
            "location": this.locationRef.current.value,
            "email": this.emailRef.current.value,
            "dob": this.dobRef.current.value,
            "education": this.educationRef.current.value,
            "about": this.aboutRef.current.value
        }
        console.log(postData1)
        let optionone = {
            "method": "PUT",
            "body": JSON.stringify(postData1),
            "headers": {
                "Content-Type": "application/json"
            }
        }
        console.log(optionone)
        const url = "http://localhost:3000/updateData/" + this.fnameRef.current.value
        fetch(url, optionone)
            .then((res) => res.json())
            .then((response) => {
                
            });
    }

    postData = () => {
        if (this.validateForm()) {
            let postdata = {
                "firstName": this.fnameRef.current.value,
                "lastName": this.lnameRef.current.value,
                "location": this.locationRef.current.value,
                "email": this.emailRef.current.value,
                "dob": this.dobRef.current.value,
                "education": this.educationRef.current.value,
                "about": this.aboutRef.current.value
            }
            let studentDataPost = {
                "method": "POST",
                "body": JSON.stringify(postdata),
                "headers": {
                    "content-type": "application/json"
                }
            }
            fetch('http://localhost:3000/postData', studentDataPost)
                .then((response) => response.json())
                .then((res) => {
                    // this.dataView()
                    this.fnameRef.current.value = "";
                    this.lnameRef.current.value = "";
                    this.locationRef.current.value = "";
                    this.emailRef.current.value = "";
                    this.dobRef.current.value = "";
                    this.educationRef.current.value = "";
                    this.aboutRef.current.value = "";
                });
        }
    }

    render() {
        const { errors } = this.state;

        return <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-12">
                        <form method="post">
                            <div className="row">
                                <input type="hidden" ref={this.idRef} />
                                <div className="col-lg-2">
                                    <label className={style.firstname_label}>FirstName:</label>
                                </div>
                                <div className="col-lg-4">
                                    <input
                                        className={style.firstname_input}
                                        type="text"
                                        name="firstName"
                                        ref={this.fnameRef}
                                    />
                                    <div className={style.error}>{errors.firstName}</div>
                                </div>
                                <div className="col-lg-2">
                                    <label className={style.lastname_label}>LastName:</label>
                                </div>
                                <div className="col-lg-4">
                                    <input
                                        className={style.lastname_input}
                                        type="text"
                                        name="lastName"
                                        ref={this.lnameRef}
                                    />
                                    <div className={style.error}>{errors.lastName}</div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-2">
                                    <label className={style.location_label}>Location:</label>
                                </div>
                                <div className="col-lg-4">
                                    <input
                                        className={style.location_input}
                                        type="text"
                                        name="location"
                                        ref={this.locationRef}
                                    />
                                    <div className={style.error}>{errors.location}</div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-2">
                                    <label className={style.email_label}>Email:</label>
                                </div>
                                <div className="col-lg-4">
                                    <input
                                        className={style.email_input}
                                        type="text"
                                        name="email"
                                        ref={this.emailRef}
                                    />
                                    <div className={style.error}>{errors.email}</div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-2">
                                    <label className={style.dob_label}>DOB:</label>
                                </div>
                                <div className="col-lg-4">
                                    <input
                                        type="date"
                                        className={style.dob_input}
                                        name="dob"
                                        ref={this.dobRef}
                                    />
                                    <div className={style.error}>{errors.dob}</div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-2">
                                    <label className={style.education_label}>Education:</label>
                                </div>
                                <div className="col-lg-4">
                                    <input
                                        type="text"
                                        className={style.education_input}
                                        name="education"
                                        ref={this.educationRef}
                                    />
                                    <div className={style.error}>{errors.education}</div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-2">
                                    <label className={style.about_label}>About:</label>
                                </div>
                                <div className="col-lg-4">
                                    <textarea
                                        className={style.about_textarea}
                                        name="about"
                                        ref={this.aboutRef}
                                    ></textarea>
                                    <div className={style.error}>{errors.about}</div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-2"></div>
                                <div className="col-lg-4">
                                    <button className={style.submit_btn} onClick={this.compareData} type="button">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <TaskView fun={this.display} />
        </>
    }
}

export default TaskForm
