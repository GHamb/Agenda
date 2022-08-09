import React from 'react';
import { Routes, Route } from "react-router-dom";

import CreateContact from './pages/create-contact';
import EditContact from './pages/edit-contact';
import ListContact from './pages/list-contact';


export default function RouteComponent() {
    return (
        <>
            <Routes>
                <Route path="" element={<ListContact />} />
                <Route path="create" element={<CreateContact />} />
                <Route path="contact/:id/edit" element={<EditContact />} />
            </Routes>
        </>
    )
}