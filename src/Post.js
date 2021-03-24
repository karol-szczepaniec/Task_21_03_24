import React, {useEffect, useState} from "react";
import {Alert, Button, Form, Col, Row} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom"
import axios from "axios";
import ToastModal from "./ToastModal";

export default function Post(){
    const route = useHistory();
    const {id} = useParams();

    const [post, setPost] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    useEffect(()=>{
        async function fetchPosts(){
            setLoading(true);
            await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res=>{
                setPost(res.data);
                setLoading(false);
            }).catch(error=>console.error(error));
        }
        fetchPosts().then().catch();
    },[]);

    async function putContent(){
        await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,post).then(res=>{
            setResponse(res);
        }).catch(error=>console.error(error));
    }

return(
   <div className="d-flex flex-column align-items-center">

       {loading ? <h1>Loading</h1> :
       <Alert
           className="m-3 ml-5 mr-5 w-50 d-flex flex-column align-items-center"
           variant="success"
       >
           <h3>Id: {id}</h3>
           <Form className="w-100">
               <Form.Group as={Row} controlId="title">
                   <Form.Label column sm={2}>Title:</Form.Label>
                   <Col md={8}>
                       <Form.Control type="text" placeholder="Title" value={post.title}
                                     onChange={(e)=>setPost(p=>
                                     {
                                         let val = Object.assign({},p);
                                         val.title = e.target.value;
                                         return val;
                                     }
                                     )}/>
                   </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="body">
                   <Form.Label column sm={2}>Body:</Form.Label>
                   <Col sm={8}>
                       <Form.Control as="textarea" placeholder="Body" value={post.body} style={{maxHeight: "400px"}}
                                     onChange={(e)=>setPost(p=>
                                       {
                                           let val = Object.assign({},p);
                                           val.body = e.target.value;
                                           return val;
                                       }
                       )}/>
                   </Col>
               </Form.Group>
           </Form>
           <Row>
               <Col>
                   <Button onClick={()=>route.push("/")} variant="warning" className="m-2">BACK</Button>
                   <Button onClick={()=>putContent()} variant="success" className="m-2">SAVE</Button>
               </Col>
           </Row>
       </Alert>}
       {(response != null) ? <ToastModal response={response} setReset={()=>setResponse(null)}/> : null}
   </div>
)
}