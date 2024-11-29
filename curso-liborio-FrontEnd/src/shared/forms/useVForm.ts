import { FormHandles } from "@unform/core";
import { useCallback, useRef } from "react";


export const useVForm = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSave = useCallback(() => {

    }, []);

    const handleSaveAndNew = useCallback(() => {

    }, []);

    const handleSaveAndClose = useCallback(() => {

    }, []);

    const handleIsSaveAndNew = useCallback(() => {

    }, []);

    const handleIsSaveAndClose = useCallback(() => {

    }, []);

    return {
        formRef,

        save: handleSave,
        saveAndNew: handleSaveAndNew,
        saveAndClose: handleSaveAndClose,
        
        isSaveAndNew: handleIsSaveAndNew,
        isSaveAndClose: handleIsSaveAndClose,
    };


}