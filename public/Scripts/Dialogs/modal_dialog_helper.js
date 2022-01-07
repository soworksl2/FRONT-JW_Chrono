'use strict';

class modal_dialog_helper_class{

    #name = "hola trujillo";

    constructor(){

    }

    show(){
        console.log(this.name);
    }
}

const modal_dialog_helper = new modal_dialog_helper_class();

export default modal_dialog_helper;