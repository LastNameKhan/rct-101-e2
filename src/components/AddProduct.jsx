import React, { useState, useEffect } from "react";

const AddProduct = () => {
  // TODO: Remove below const and instead import them from chakra
  // const Button = () => <div />;
  // const Modal = () => <div />;
  // const ModalBody = () => <div />;
  // const Input = () => <div />;
  // const Select = () => <div />;
  // const RadioGroup = () => <div />;
  // const Radio = () => <div />;
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const saveInfo = () => {
    //call api to save this information in backend
    fetch("http://localhost:8080/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        value: newTodo,
        isCompleted: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]);
        setNewTodo("");
      });
  };
  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  return (
    <>
      <Button my={4} data-cy="add-product-button"></Button>
      <Modal>
        <ModalBody pb={6}>
          <Input
            value={newTodo}
            onChange={({ target }) => setNewTodo(target.value)}
            data-cy="add-product-title"
          />
          <Select data-cy="add-product-category">
            <option data-cy="add-product-category-shirt"></option>
            <option data-cy="add-product-category-pant"></option>
            <option data-cy="add-product-category-jeans"></option>
          </Select>
          <RadioGroup data-cy="add-product-gender">
            <Radio data-cy="add-product-gender-male"></Radio>
            <Radio data-cy="add-product-gender-female"></Radio>
            <Radio data-cy="add-product-gender-unisex"></Radio>
          </RadioGroup>
          <Input data-cy="add-product-price" />
          <Button data-cy="add-product-submit-button"></Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddProduct;
