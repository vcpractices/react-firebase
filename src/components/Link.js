import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

import LinkForm from './LinkForm';

import { db } from '../firebase';
import { buildQueries } from '@testing-library/react';

const Link = () => {

    const [Link, setLink] = useState([])
    const [currentId, setCurrentId] = useState("")

    const addTask = async (linkObject) => {
        try {
            if(currentId === "") {
                await db.collection('links').doc().set(linkObject)
                swal("Tarea Agregada", "success");
            } else {
                await db.collection('links').doc(currentId).update(linkObject)
                swal("Tarea Actulizada", " ", "info");
            }
            setCurrentId("")
            
        } catch (error) {
            console.error(error)
        }        
        

        console.log('Tarea Agregada')
        // console.log(linkObject)
        // console.log('nueva Tarea')
    }

    const onDeleteLink = (id) => {
        swal({
            title: "Estas seguro de borrar la tarea ?",
            text: "Una vez borrado no se podra recuperar",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                db.collection('links').doc(id).delete();
                swal("Tarea elmininada", {
                icon: "success",
              });
            } else {
              swal("No se pudo eliminar");
            }
          });
        // console.log(id) 
    }

    const getLink = async () => {
        db.collection('links').onSnapshot(
            (querySnapshot) => {
                const docs = [];
                querySnapshot.forEach((doc) => {
                    // console.log(doc.data())
                    // console.log(doc.id)
                    docs.push({ ...doc.data(), id: doc.id })
                })
                console.log(docs)
                setLink(docs)
            })
    }

    useEffect(() => {
        getLink();
    }, [])

    return (
        <div>
            <div className="col-md-30">
                <LinkForm {...{addTask, currentId, Link}} />
            </div>
            <div className="col-md-20">
                {Link.map(Link => {
                    return (
                        <div className="card mb-3" key={Link.id}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h4>{Link.name}</h4>
                                    <div>
                                        <i className="material-icons text-danger"
                                            onClick={() => onDeleteLink(Link.id)} >delete</i>
                                        <i className="material-icons"
                                            onClick={()=> setCurrentId(Link.id)} > create</i>    
                                    </div>
                                </div>
                                <p>{Link.description}</p>
                                <a href={Link.url} target="_blank" rel="noreferrer">
                                    Ir a la página
                            </a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Link