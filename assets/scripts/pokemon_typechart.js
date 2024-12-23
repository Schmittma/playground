const typechart = [
    /*                     NOR  FIR  WAT  ELE  GRA  ICE  FIG  POI  GRO  FLY  PSY  BUG  ROC  GHO  DRA  DAR  STE  FAI */
    [ ['NOR'], ['#aa9'], [   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1, 0.5,   0,   1,   1, 0.5,   1]],
    [ ['FIR'], ['#f42'], [   1, 0.5, 0.5,   1,   2,   2,   1,   1,   1,   1,   1,   2, 0.5,   1, 0.5,   1,   2,   1]],
    [ ['WAT'], ['#39f'], [   1,   2, 0.5,   1, 0.5,   1,   1,   1,   2,   1,   1,   1,   2,   1, 0.5,   1,   1,   1]],
    [ ['ELE'], ['#fc3'], [   1,   1,   2, 0.5, 0.5,   1,   1,   1,   0,   2,   1,   1,   1,   1, 0.5,   1,   1,   1]],
    [ ['GRA'], ['#7c5'], [   1, 0.5,   2,   1, 0.5,   1,   1, 0.5,   2, 0.5,   1, 0.5,   2,   1, 0.5,   1, 0.5,   1]],
    [ ['ICE'], ['#6cf'], [   1, 0.5, 0.5,   1,   2, 0.5,   1,   1,   2,   2,   1,   1,   1,   1,   2,   1, 0.5,   1]],
    [ ['FIG'], ['#b54'], [   2,   1,   1,   1,   1,   2,   1, 0.5,   1, 0.5, 0.5, 0.5,   2,   0,   1,   2,   2, 0.5]],
    [ ['POI'], ['#a59'], [   1,   1,   1,   1,   2,   1,   1, 0.5, 0.5,   1,   1,   1, 0.5, 0.5,   1,   1,   0,   2]],
    [ ['GRO'], ['#db5'], [   1,   2,   1,   2, 0.5,   1,   1,   2,   1,   0,   1, 0.5,   2,   1,   1,   1,   2,   1]],
    [ ['FLY'], ['#89f'], [   1,   1,   1, 0.5,   2,   1,   2,   1,   1,   1,   1,   2, 0.5,   1,   1,   1, 0.5,   1]],
    [ ['PSY'], ['#f59'], [   1,   1,   1,   1,   1,   1,   2,   2,   1,   1, 0.5,   1,   1,   1,   1,   0, 0.5,   1]],
    [ ['BUG'], ['#ab2'], [   1, 0.5,   1,   1,   2,   1, 0.5, 0.5,   1, 0.5,   2,   1,   1, 0.5,   1,   2, 0.5, 0.5]],
    [ ['ROC'], ['#ba6'], [   1,   2,   1,   1,   1,   2, 0.5,   1, 0.5,   2,   1,   2,   1,   1,   1,   1, 0.5,   1]],
    [ ['GHO'], ['#66b'], [   0,   1,   1,   1,   1,   1,   1,   1,   1,   1,   2,   1,   1,   2,   1, 0.5,   1,   1]],
    [ ['DRA'], ['#76e'], [   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   2,   1, 0.5,   0]],
    [ ['DAR'], ['#754'], [   1,   1,   1,   1,   1,   1, 0.5,   1,   1,   1,   2,   1,   1,   2,   1, 0.5,   1, 0.5]],
    [ ['STE'], ['#aab'], [   1, 0.5, 0.5, 0.5,   1,   2,   1,   1,   1,   1,   1,   1,   2,   1,   1,   1, 0.5,   2]],
    [ ['FAI'], ['#e9e'], [   1, 0.5,   1,   1,   1,   1,   2, 0.5,   1,   1,   1,   1,   1,   1,   2,   2, 0.5,   1]],
];

const TYPE_ID_ATTRIBUTE = "type_id"; 
const COLOUMN_ATTRIBUTE = "COL_ID";

const COLOR_0_EFFECTIVE_CLASS = "mult_0";
const COLOR_0_25_EFFECTIVE_CLASS = "mult_0_25";
const COLOR_0_5_EFFECTIVE_CLASS = 'mult_0_5';
const COLOR_2_EFFECTIVE_CLASS = 'mult_2';
const COLOR_4_EFFECTIVE_CLASS = 'mult_4';

const NUM_TYPES = typechart.length;

let selected_cells = [];

/**
 * Utility function for create, append and to set the text of a new element
 * 
 * @param {string} type Name of the type. See document.createElement()
 * @param {Element} parent The newly created element will be appended to this parent
 * @param {string} text The innerHTML of the new element will be set to this 
 * @returns The newly created element
 */
function createElement(type, parent, text) {
    let newElement = document.createElement(type);
    newElement.innerHTML =  text;
    parent.appendChild(newElement);

    return newElement;
}

/**
 * 
 */
function onClick_selectType() {
    let type_id = Number(this.getAttribute(TYPE_ID_ATTRIBUTE));
    let cell_index = selected_cells.indexOf(type_id) 
    if(cell_index == -1)
    {
        if(selected_cells.length >= 2)
        {
            selected_cells.splice(0,1);
        }
    
        selected_cells.push(type_id);
        this.style.fontWeight = "bolder";
    }
    else
    {
        selected_cells.splice(cell_index,1);
    }

    update_breakdown_table();
}

function onClick_deselect_all(self) 
{
    selected_cells = [];
    self.style.background = '#fff';
    update_breakdown_table();
}

function update_breakdown_table()
{
    let breakdown_table_data = document.getElementById("typechart__breakdown_data");
    let breakdown_table_header = document.getElementById("typechart__breakdown_table_type");

    Array.prototype.forEach.call(breakdown_table_data.cells, cell => cell.innerHTML = "");

    if(selected_cells.length < 1 || selected_cells.length > 3)
    {
        breakdown_table_header.innerHTML = "No type selected";
        return;
    }

    breakdown_table_header.innerHTML = typechart[selected_cells[0]][0];
    breakdown_table_header.style.background = typechart[selected_cells[0]][1];

    if(selected_cells.length == 2)
    {
        breakdown_table_header.innerHTML += " | " + typechart[selected_cells[1]][0];
        setGradient(breakdown_table_header, typechart[selected_cells[0]][1], typechart[selected_cells[1]][1])
    }

    for(let typeId = 0; typeId < NUM_TYPES; typeId++)
    {
        let value = typechart[typeId][2][selected_cells[0]];

        if(selected_cells.length == 2)
        {
            value *= typechart[typeId][2][selected_cells[1]];
        }

        let multiplier_col = null;
        if(value == 1)
        {
            multiplier_col = breakdown_table_data.cells[3];
        } 
        else if (value == 0.25)
        {
            multiplier_col = breakdown_table_data.cells[1];
        }
        else if (value == 0.5)
        {
            multiplier_col = breakdown_table_data.cells[2];
        }
        else if (value == 2)
        {
            multiplier_col = breakdown_table_data.cells[4];
        }
        else if (value == 4)
        {
            multiplier_col = breakdown_table_data.cells[5];
        }
        else
        {
            multiplier_col = breakdown_table_data.cells[0];
        }

        let type_box = createElement("div", multiplier_col, typechart[typeId][0]);
        type_box.style.background = typechart[typeId][1];
    }
}

/**
 * Highlights the column which is being hovered 
 * 
 * @param {Element} element The header of the coloumn
 */
function onMouseOver_hightlightTypeColoumn()
{
    let col  = Number(this.getAttribute(TYPE_ID_ATTRIBUTE)) + 1;
    let table = document.getElementById("typechart__main_table");

    for(let row = 1; row < table.rows.length; row++ )
    {
        table.rows[row].cells[col].classList.add("highlighted");
    }
}

/**
 * De-Highlights the column which is being hovered 
 * 
 * @param {Element} element The header of the coloumn
 */
 function onMouseOut_deHightlightTypeColoumn()
 {
    let col = Number(this.getAttribute(TYPE_ID_ATTRIBUTE)) + 1;
    let table = document.getElementById("typechart__main_table");

    for(let row = 1; row < table.rows.length; row++ )
    {
        table.rows[row].cells[col].classList.remove("highlighted");
    }
}

function setGradient(element, color1, color2) {
    element.style.background = 
    "linear-gradient(to right, " 
    + color1
    + ", " 
    + color2 
    + ")";
}

let table = document.getElementById("typechart__main_table");
let headerRow = createElement("tr", table, "");

let atk_def = createElement("th", headerRow, "Defense &#x2192;<br>Attack &#x2193");
atk_def.id = "typechart__table_atk_def";

for (let i = 0; i < NUM_TYPES; i++) {
    let header = createElement("th", headerRow, typechart[i][0]);
    header.setAttribute(TYPE_ID_ATTRIBUTE, i);
    header.style.background = typechart[i][1];
    header.style.cursor = "pointer";
    header.onmouseover = onMouseOver_hightlightTypeColoumn;
    header.onmouseout = onMouseOut_deHightlightTypeColoumn;
    header.onclick = onClick_selectType;
}

for (let i = 0; i < NUM_TYPES; i++) {
    let row = createElement("tr", table, "");
    let tableHeader = createElement("th", row, typechart[i][0]);
    tableHeader.style.background = typechart[i][1];

    for (let j = 0; j < NUM_TYPES; j++) {
        let tableData = createElement("td", row, "");
        
        if(typechart[i][2][j] == 0)
        {
            tableData.innerHTML = '0';
            tableData.classList.add(COLOR_0_EFFECTIVE_CLASS);
        }
        else if(typechart[i][2][j] == 0.5)
        {
            tableData.innerHTML = '&#189;';
            tableData.classList.add(COLOR_0_5_EFFECTIVE_CLASS);
        }
        else if(typechart[i][2][j] == 2)
        {
            tableData.innerHTML = '2';
            tableData.classList.add(COLOR_2_EFFECTIVE_CLASS);
        }
    }
}