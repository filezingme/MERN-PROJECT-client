import { Modal, Button, Form } from "react-bootstrap"
import { postContext } from "../../contexts/postContext"
import { useContext, useEffect, useState } from "react"

const UpdatePostModal = () => {

    //Context
    const { postState: {post}, showUpdatePostModal, setShowUpdatePostModal, updatePost, setShowToast } = useContext(postContext)


    //State
    const [updatedPost, setUpdatedPost] = useState(post)


    const {title, description, url, status} = updatedPost


    useEffect(() => setUpdatedPost(post), [post])


    const onChangeUpdatedPostForm = event => {
        setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value })
    }


    const handleClose = () => {
        setUpdatedPost(post)
        setShowUpdatePostModal(false)
    }


    const handleSubmit = async event => {
        event.preventDefault()
        const {success, message} = await updatePost(updatedPost)
        
        setShowUpdatePostModal(false)
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }


    return (
        <Modal show={showUpdatePostModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Making progress?</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>

                    <Form.Group>
                        <Form.Control type="text" placeholder="Title" name='title' required aria-describedby="title-help" value={title} onChange={onChangeUpdatedPostForm} />
                        <Form.Text id="title-help" muted>Required</Form.Text>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Control as='textarea' rows={3} placeholder="Description" name='description' value={description} onChange={onChangeUpdatedPostForm} />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Control type="text" placeholder="Youtube Tutorial URL" name='url' value={url} onChange={onChangeUpdatedPostForm} />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Control as="select" name='status' value={status} onChange={onChangeUpdatedPostForm} className="form-select" >
                            <option value='TO LEARN'>TO LEARN</option>
                            <option value='LEARNING'>LEARNING</option>
                            <option value='LEARNED'>LEARNED</option>
                        </Form.Control>
                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" type="submit">LearnIt!</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePostModal