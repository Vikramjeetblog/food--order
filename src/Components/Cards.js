import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatch } from './Reducer';

function Cards(props) {
  let options = props.options;
  let price = Object.keys(options);
  let dispatch = useDispatch();
  let Data = useCart();
  const priceref = useRef();
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [finalPrice, setFinalPrice] = useState(0);

  const handleCart = async () => {
    const existingItem = Data.find((item) => item.id === props.fooditem._id && item.size === size);
    const itemQuantity = parseInt(existingItem?.quantity || 0) + parseInt(quantity);
    const itemPrice = parseInt(options[size]);
  
    if (existingItem) {
      await dispatch({
        type: "UPDATE",
        id: props.fooditem._id,
        price: itemPrice * itemQuantity,
        quantity: itemQuantity,
        size: size,
      });
    } else {
      await dispatch({
        type: "ADD",
        id: props.fooditem._id,
        name: props.fooditem.name,
        price: itemPrice * quantity,
        quantity: quantity,
        size: size,
      });
    }
  };
  

  useEffect(() => {
    setSize(priceref.current.value);
  }, [options]);

  useEffect(() => {
    const finalprice = quantity * parseInt(options[size]);
    setFinalPrice(finalprice);
  }, [quantity, size, options]);

  return (
    <>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img src={props.fooditem.img} className="card-img-top" alt="..." style={{ objectFit: "fill", height: "150px" }} />
        <div className="card-body m-3">
          <h5 className="card-title">{props.fooditem.name}</h5>
          <div className="container w-100">
            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQuantity(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return <option key={i + 1} value={i + 1}>{i + 1}</option>;
              })}
            </select>
            <select className="m-2 h-100 bg-success rounded " ref={priceref} onChange={(e) => setSize(e.target.value)}>
              {price.map((data) => {
                return <option key={data} value={data}>{data}</option>;
              })}
            </select>
            <div className="d-inline fs-5 h-100">₹{finalPrice}/</div>
          </div>
          <hr></hr>
          <div className="btn bg-success text-white" onClick={handleCart}>
            Add to Cart
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
