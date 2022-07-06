import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryAdd, categoryEditAction, categoryUpdateAction, listCategories } from "../../Redux/Actions/CategoryActions";
import { useForm } from "react-hook-form";
import { CATEGORY_ADD_RESET, CATEGORY_LIST_SUCCESS } from "../../Redux/Constants/CategoryConstants";
import { COURSE_UPDATE_RESET } from "../../Redux/Constants/CourseConstants";
import { useHistory } from "react-router-dom";

const EditCategory = ({categoryId}) => {
  const {categories} = useSelector(state=>state.categoryList);
  const {category}=useSelector(state=>state.categoryEdit);
  const [parentCategoryId,setParentCategoryId]=useState(null);
  const [name,setName]=useState("");
  const [isFeatured,setIsFeatured]=useState(false);
  const dispatch=useDispatch();
  const history=useHistory();
   useEffect(()=>{
    dispatch(categoryEditAction(categoryId));
    if(category.parentId || category.categoryId!==categoryId ){
        setParentCategoryId(category.parentId)
        setName(category.name)
        setIsFeatured(category.isFeatured)
    }
  },[dispatch,categoryId,category.parentId,category.name,category.isFeatured,category.categoryId]);
  const categorySubmitHandler=(e)=>{
    e.preventDefault();
    const data={
      id:categoryId,name,parentCategoryId,isFeatured
    }
    dispatch(categoryUpdateAction(data));
    history.push("/category")
  }
  return (
    <div className="col-md-12 col-lg-4">
      <h3>Edit Category</h3>
      {category && (
          <form onSubmit={categorySubmitHandler}>
          <div className="mb-4">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="form-control py-3"
              id="name"
              defaultValue={category.name}
              onChange={e=>setName(e.target.value)}

            />
          </div>
          <div className="mb-4">
            <label className="form-label">Parent Category</label>
            { categories && categories.length>0 && (
              <select className="form-control"
                name="parentCategoryId"
                value={parentCategoryId}
                onChange={e=>setParentCategoryId(Number(e.target.value))}
              >
                <option value={0}>None</option>
                {categories?.map(cate=>(
                  <option
                    value={cate.categoryId}
                    key={cate.categoryId}
                    >
                      {cate.name}
                  </option>
                ))}
              </select>
            )}

          </div>
           <div className="mb-4">
           <label htmlFor="isFeatured" className="form-label">Is Featured</label>
            <input name="isFeatured" 
              onChange={e=>setIsFeatured(e.target.value)}
             type="checkbox" id="isFeatured" checked={isFeatured? true:false}/>
          </div>
          <div className="d-grid">
            <button className="btn btn-primary py-3">Edit category</button>
          </div>
        </form>
      )}
    
    </div>
  );
};

export default EditCategory;
