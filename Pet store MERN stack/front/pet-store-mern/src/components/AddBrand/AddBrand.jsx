import { useState } from 'react'
import './AddBrand.css'
import axios from 'axios';

const AddBrand = () => {

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [error, setError] = useState();

    const handleAddBrand = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", image);

        try{
            const response = await axios.post("http://localhost:8080/brand/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            window.location.href = '/';
        } catch(err){
            setError('Failed to add brand');
        }

    }

    return(
        <form className="add-brand" onSubmit={handleAddBrand}>
            <h1 className="add-header">
                Add a new brand
            </h1>
            {error && <p className='login-error'>{error}</p>}
            <input type="name" value={name} onChange={(e) => setName(e.target.value)} className="add-input" placeholder='Brand name'/>
            <textarea type="description" value={description} onChange={(e) => setDescription(e.target.value)} className="add-input add-description" placeholder='Brand description'/>
            <div className="add-text">Add logo of the brand</div>
            <input type="file" className="image-input" onChange={(e) => setImage(e.target.files[0])}/>
            <button className="submit-product" type='submit'>Add brand</button>
        </form>
    )
}

export default AddBrand