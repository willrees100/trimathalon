const Storage={key:'trimathalon_personal_best',get(){try{return Number(localStorage.getItem(this.key))||null}catch(e){return null}},set(t){try{localStorage.setItem(this.key,t)}catch(e){}}};
