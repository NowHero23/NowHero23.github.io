(()=>{
    window.addEventListener("load",()=>{

        var contactListData = {
            head: ["№", "ФИО", "Контактный телефон", "email"],
            body: [
                {   ID: 1,
                    fio: "Незнайкин Петр Иванович",
                    phone: '+380662548569',
                    email: 'nexn@petr.com'
                },
                {
                    ID: 2,
                    fio: "Иванов Андрей Сергеевич",
                    phone: '+380954584589',
                    email: 'ivan@gmail.com'
                },
                {
                    ID: 3,
                    fio: "Сидоров Юрий Иванович",
                    phone: '+380972568954',
                    email: 'sidr@gmail.com'
                },
                {
                    ID: 4,
                    fio: "Никулин Олексей Юрьевич",
                    phone: '+380995684578',
                    email: 'nikki@gmail.com'
                },
                {
                    ID: 5,
                    fio: "Чак Норрис",
                    phone: 'secret info',
                    email: 'secret@info.com'
                },
            ]
        };

        let col = [];

        createTable = () => {
            // HEADER
            for (var i = 0; i < contactListData.body.length; i++) {
                for (var key in contactListData.body[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }

            // CREATE A TABLE
            var table = document.createElement('table');
            table.setAttribute('id', 'contactsTable');     // SET TABLE ID

            var tr = table.insertRow(-1);               // CREATE A ROW (FOR HEADER)

            for (var h = 0; h < col.length; h++) {
                // ADD TABLE HEADER
                var th = document.createElement('th');
                th.innerHTML =  contactListData.head[h];
                tr.appendChild(th);
            }

            // ADD ROWS
            for (var i = 0; i <  contactListData.body.length; i++) {
                tr = table.insertRow(-1);           

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = contactListData.body[i][col[j]];
                }

                var td = document.createElement('td');

                // *** CANCEL OPTION
                tr.appendChild(td);
                var lblCancel = document.createElement('label');
                lblCancel.innerHTML = '✖';
                lblCancel.setAttribute('onclick', 'Cancel(this)');
                lblCancel.setAttribute('style', 'display:none;');
                lblCancel.setAttribute('title', 'Cancel');
                lblCancel.setAttribute('id', 'lbl' + i);
                td.appendChild(lblCancel);

                // *** SAVE
                tr.appendChild(td);
                var btSave = document.createElement('input');

                btSave.setAttribute('type', 'button');
                btSave.setAttribute('value', 'Save');
                btSave.setAttribute('id', 'Save' + i);
                btSave.setAttribute('style', 'display:none;');
                btSave.setAttribute('onclick', 'Save(this)');
                td.appendChild(btSave);

                // *** UPDATE
                tr.appendChild(td);
                var btUpdate = document.createElement('input');

                btUpdate.setAttribute('type', 'button');   
                btUpdate.setAttribute('value', 'Update');
                btUpdate.setAttribute('id', 'Edit' + i);
                btUpdate.setAttribute('style', 'background-color:#44CCEB;');
                btUpdate.setAttribute('onclick', 'Update(this)');   
                td.appendChild(btUpdate);

                // *** DELETE
                td = document.createElement('th');
                tr.appendChild(td);
                var btDelete = document.createElement('input');
                btDelete.setAttribute('type', 'button');
                btDelete.setAttribute('value', 'Delete');
                btDelete.setAttribute('style', 'background-color:#ED5650;');
                btDelete.setAttribute('onclick', 'Delete(this)');   
                td.appendChild(btDelete);

                // *** Up
                td = document.createElement('th');
                tr.appendChild(td);
                var btUp = document.createElement('input');
                btUp.setAttribute('type', 'button');
                btUp.setAttribute('value', 'Up');
                btUp.setAttribute('style', 'background-color:#3d6166;');
                btUp.setAttribute('onclick', 'Up(this)');
                td.appendChild(btUp);

                // *** Down
                td = document.createElement('th');
                tr.appendChild(td);
                var btDown = document.createElement('input');
                btDown.setAttribute('type', 'button');
                btDown.setAttribute('value', 'Down');
                btDown.setAttribute('style', 'background-color:#3d6166;');
                btDown.setAttribute('onclick', 'Down(this)');
                td.appendChild(btDown);
            }

            tr = table.insertRow(-1);          

            for (var j = 0; j < col.length; j++) {
                var newCell = tr.insertCell(-1);
                if (j >= 1) {
                    var tBox = document.createElement('input');          
                    tBox.setAttribute('type', 'text');
                    tBox.setAttribute('value', '');
                    newCell.appendChild(tBox); 
                }
            }

            td = document.createElement('td');
            tr.appendChild(td);

            var btNew = document.createElement('input');

            btNew.setAttribute('type', 'button');      
            btNew.setAttribute('value', 'Create');
            btNew.setAttribute('id', 'New' + i);
            btNew.setAttribute('style', 'background-color:#207DD1;');
            btNew.setAttribute('onclick', 'CreateNew(this)');       
            td.appendChild(btNew);

            var div = document.getElementById('container');
            div.innerHTML = '';
            div.appendChild(table);    // ADD TABLE 
        };

        // ****** OPERATIONS

        // CANCEL
        Cancel = (oButton) => {
            oButton.setAttribute('style', 'display:none; float:none;');

            var activeRow = oButton.parentNode.parentNode.rowIndex;

            var btSave = document.getElementById('Save' + (activeRow - 1));
            btSave.setAttribute('style', 'display:none;');

            var btUpdate = document.getElementById('Edit' + (activeRow - 1));
            btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

            var tab = document.getElementById('contactsTable').rows[activeRow];

            for (i = 0; i < col.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                td.innerHTML = contactListData.body[(activeRow - 1)][col[i]];
            }
        }

        // EDIT DATA
        Update = (oButton) => {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('contactsTable').rows[activeRow];

            for (i = 1; i < 4; i++) {
            
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('input');
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', td.innerText);
                td.innerText = '';
                td.appendChild(ele);
            }

            var lblCancel = document.getElementById('lbl' + (activeRow - 1));
            lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

            var btSave = document.getElementById('Save' + (activeRow - 1));
            btSave.setAttribute('style', 'display:block; margin-left:25px; float:left; background-color:#2DBF64;');

            oButton.setAttribute('style', 'display:none;');
        };

        // DELETE DATA
        Delete = (oButton) => {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            contactListData.body.splice((activeRow - 1), 1);
            createTable();
        };

        // SAVE DATA
        Save = (oButton) => {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('contactsTable').rows[activeRow];

            for (i = 1; i < col.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {
                    contactListData.body[(activeRow - 1)][col[i]] = td.childNodes[0].value;
                }
            }
            createTable();
        }

        // UP ROW
        Up = (oButton) => {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            if(activeRow>1){
                var tempId = contactListData.body[activeRow-1].ID;      
                contactListData.body[activeRow-1].ID = contactListData.body[activeRow-2].ID;
                contactListData.body[activeRow-2].ID = tempId;
    
                var temp = contactListData.body[activeRow-1];      
                contactListData.body[activeRow-1] = contactListData.body[activeRow-2];
                contactListData.body[activeRow-2] = temp;

                createTable();
            }
        }

        // Down ROW
        Down = (oButton) => {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            if(activeRow-1<contactListData.body.length-1){
                var tempId = contactListData.body[activeRow-1].ID;      
                contactListData.body[activeRow-1].ID = contactListData.body[activeRow].ID;
                contactListData.body[activeRow].ID = tempId;

                var temp = contactListData.body[activeRow-1];      
                contactListData.body[activeRow-1] = contactListData.body[activeRow];
                contactListData.body[activeRow] = temp;

                createTable();
            }
        }

        // CREATE NEW
        CreateNew = (oButton) => {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('contactsTable').rows[activeRow];
            var obj = {};

            if(contactListData.body[contactListData.body.length-1]!=null){
                obj[col[0]] = contactListData.body[contactListData.body.length-1].ID + 1;
            }
            else{
                obj[col[0]]=1;
            }

            for (i = 1; i < col.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {
                    var txtVal = td.childNodes[0].value;
                    if (txtVal != '') {
                        obj[col[i]] = txtVal.trim();
                    }
                    else {
                        obj = '';
                        alert('all fields are compulsory');
                        break;
                    }
                }
            }
            
            if (Object.keys(obj).length > 0) {      
                contactListData.body.push(obj);             
                createTable();                
            }
        }
        
        createTable();

    })
})()