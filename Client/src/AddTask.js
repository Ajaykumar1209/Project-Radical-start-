import React, { Component } from 'react'
import style from './addtask.module.css'
import search from './search.png'
import TaskForm from './TaskForm'
import TaskView from './TaskView'
class AddTask extends Component{
    constructor(){
        super()
        this.state={
            "flag":false,
        }
    }
    displayData=()=>{
        this.setState({
            "flag":true
        })
    }
    render(){
       
        return<div className='container'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div>
                        <label className={style.head}>Student Management System</label>
                    </div>          
                    <div className={style.search_div}>
                        <input type='text' className={style.search_box} placeholder='Search...'/>
                        <button className={style.search_button}><img src={search}/></button>
                        <button className={style.button} onClick={this.displayData}>ADD</button><br/>
                    </div>   
                </div>
            </div>
            {this.state.flag ? <TaskForm/> : <TaskView/>}
            
        </div>
    }
}

export default AddTask