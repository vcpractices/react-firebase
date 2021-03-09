import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import swal from 'sweetalert';

const LinkForm = (props) => {

    const initialValues = {
        url: '',
        name: '',
        description: ''
    }

    const [values, setValues] = useState({ initialValues })

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]:value})
        
        // console.log(e.value)
        // console.log(e.target.value)
    }

    const validateUrl = (str) => {
        var urls = new RegExp (
            "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
            "i"
        )
        return !!urls.test(str)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!validateUrl(values.url)) {
            return swal("Url inválida", "ingrese un url válido", "error");
        }

        console.log(values)
        props.addTask(values);
        setValues({...initialValues})
    }

    const getLinkById = async (id) => {
        const doc = await db.collection('links').doc(id).get()
         setValues({...doc.data()})   
        // console.log(doc.data())
    }

    useEffect(() => {
        // console.log(props.currentId)
        if(props.currentId === '') {
            setValues({...initialValues})
        } else {
            getLinkById(props.currentId)
        }
    }, [props.currentId])

    return (
        <form className="card card-body border-primary" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="https://someurl.com"
                    name="url"
                    onChange={handleInputChange}
                    value={values.url} />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input
                    type="text"
                    name="name"
                    placeholder="nombre del sitio web"
                    className="form-control"
                    onChange={handleInputChange}
                    value={values.name} />
            </div>
            <div className="form-group">
                <textarea
                    rows="3"
                    className="form-control"
                    placeholder="Escribe una descripcion"
                    name="description"
                    onChange={handleInputChange} 
                    value={values.description} >
                </textarea>
            </div>
            <button className="btn btn-warning btn-block">
                {props.currentId === '' ? 'Guardar' : 'Actualizar'}
            </button>
        </form>
    )
}

export default LinkForm