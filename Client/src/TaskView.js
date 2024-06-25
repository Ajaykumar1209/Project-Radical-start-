import React,{Component} from "react";
import style from './taskview.module.css'
class TaskView extends Component{
    constructor(){
        super()
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        this.dataView()
    }
    dataView=()=>{
        fetch('http://localhost:3000/viewdata')
        .then((response)=>response.json())
        .then((res)=>{
            this.setState({
                data:res
            })
        })
    }
    passData = (namee) => {
        this.props.fun(namee, true)        
    }
    
    render(){
        let mydata=this.state.data.map((datas,index)=><tr key={index}>
                        <td className={style.name1} >{index+1}</td>
                        <td className={style.name1}>{datas.firstname}</td>
                        <td className={style.name1}>{datas.lastname}</td>
                        <td className={style.name1}>{datas.location}</td>
                        <td className={style.name1}>{datas.email}</td>
                        <td className={style.name1}>{datas.dob}</td>
                        <td className={style.name1}>{datas.education}</td>
                        <td className={style.name1}>{datas.about}</td>
                        <td ><button className={style.btn} type='button' name={datas.firstname}  onClick={() => this.passData(datas.firstname)}>Edit</button></td>
                        <td ><button className={style.btn} type='button' name={datas.firstname}  >Delete</button></td>
                </tr>
        
        )
        
        return <div className="container mt-4">
        <div className='table-responsive'>
            <table className='table'>
                <tr>
                    <th className={style.name1} scope='col'>ID</th>
                    <th className={style.name1} scope='col'>FirstName</th>
                    <th className={style.name1} scope='col'>LastName</th>
                    <th className={style.name1} scope='col'>Location</th>
                    <th className={style.name1} scope='col'>Email</th>
                    <th className={style.name1} scope='col'>DOB</th>
                    <th className={style.name1} scope='col'>Education</th>
                    <th className={style.name1} scope='col'>About</th>
                    <th className={style.name1} scope="col">Action</th>
                    <th className={style.name1} scope="col">Delete</th>
                </tr>
                {mydata}
            </table>
        </div>
    </div>    
    }
}
export default TaskView