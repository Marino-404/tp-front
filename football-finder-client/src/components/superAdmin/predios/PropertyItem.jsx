
import React, { useState, useContext } from "react";
import { inputStyle, colorStrong } from "../../styles/Cards.jsx";
import RedButton from "../../styles/RedButton.jsx";
import { API_BASE_URL } from "../../../config/api.js";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import useConfirmModal from "../../../hooks/useConfirmModal";

function PropertyItem({ property }) {

  const { token } = useContext(AuthenticationContext);
  const { Modal, show } = useConfirmModal();

  const deleteProperty = () => {
    fetch(`${API_BASE_URL}/properties/${property.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
        if (!res.ok) {
          throw new Error("Error al borrar la propiedad");
        }
        successToast("Propiedad Borrado!");
        onUserDelete(user.id);
      
      })
      .catch((err) => {
        console.log("first")
        errorToast(err.message || err);
      });
    };

  const handleClickDlt = () => {
    show({
      title: "¿Estás seguro que deseas borrar esta propiedad?",
      message:
        "Esta acción no se puede deshacer y se eliminará todo su historial.",
      confirmText: "Borrar",
      cancelText: "Cancelar",
      onConfirm: () => {
        deleteProperty();
      },
    });
  };

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <p className="text-lg text-blue-400 font-semibold mb-4">
        {property.name}
      </p>

      <p className={inputStyle}>
        <strong className={colorStrong}>Dirección:</strong> {property.address}
      </p>

      <p className={inputStyle}>
        <strong className={colorStrong}>Horarios:</strong>{" "}
        {property.schedules.map((sch, index) => (
          <span key={index}>
            {sch.schedule} hs
            {index < property.schedules.length - 1 && " - "}
          </span>
        ))}
      </p>

      <p className={inputStyle}>
        <strong className={colorStrong}>Canchas:</strong>{" "}
        {property.fields.map((field, index) => (
          <span key={index}>
            {field.field}
            {index < property.fields.length - 1 && " - "}
          </span>
        ))}
      </p>

      <RedButton onClick={handleClickDlt}>Borrar propiedad</RedButton>
      <Modal />
    </div>
  );
}

export default PropertyItem;
