import React, {useEffect, useState} from "react";
import {Alert, Pagination, Col, Row, Form, Button} from "react-bootstrap";
import axios from "axios";
import {useHistory} from "react-router-dom"
import './App.css';

export default function App() {

    let route = useHistory();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(3);

    const [showingPosts, setShowingPosts] = useState([]);
    const [arrLength, setArrLength] = useState(null);
    const [postOnPage, setPostOnPage] = useState(2);
    const [activePage, setActivePage] = useState(1);
    const [first, setFirst] = useState(true);
    let items = [];

    useEffect(()=>{
        async function fetchPosts(){
            setLoading(true);
            await axios.get('https://jsonplaceholder.typicode.com/posts').then(res=>{
                setPosts(res.data);
                setLoading(false);
        }).catch(error=>console.error(error));
        }
        fetchPosts().then().catch();
    },[]);

    const paginationItems = [];
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);

    const postList = currentPosts.map(post=> (
        <Alert
            className="m-3 ml-5 mr-5 w-50"
            key={post.id}
            variant="success"
        >
            <h3>Id: {post.id}</h3>
            <h5>{post.title}</h5>
            <p>{post.body}</p>
            <Button onClick={()=>route.push(`/post/${post.id}`)}>EDIT</Button>
        </Alert>
    ))

    function paginate(val){
        setCurrentPage(val);
    }

    for(let i=1; i<=Math.ceil(posts.length / postPerPage) ; i++){
        paginationItems.push(
            <Pagination.Item key={i} active={i==currentPage} onClick={()=>paginate(i)}> {i} </Pagination.Item>)
    }

  return (
    <div className="App d-flex flex-column justify-content-center align-items-center">
        <h1>POST LIST</h1>
        { loading ? <h1>Loading</h1> : postList }
        <Row>
            <Col className="d-flex">
                <Form.Group className="mr-5">
                    <Form.Control as="select" size="sm" onChange={(e)=>{setPostPerPage(e.target.value); setCurrentPage(1)}}>
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                        <option>60</option>
                    </Form.Control>
                </Form.Group>
                <Pagination size="sm">
                    <Pagination.First onClick={()=>setCurrentPage(1)}/>
                    <Pagination.Prev onClick={()=>setCurrentPage(p=> currentPage>1 ? p-1 : p)}/>
                    {paginationItems}
                    {/*<Pagination.Ellipsis />*/}
                    <Pagination.Next onClick={()=>setCurrentPage(p=> (currentPage < Math.ceil(posts.length / postPerPage)) ? p+1 : p)}/>
                    <Pagination.Last onClick={()=>setCurrentPage(Math.ceil(posts.length / postPerPage))}/>
                </Pagination>
            </Col>
        </Row>
    </div>
  );
}

