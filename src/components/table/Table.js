import {ExelComponent} from '../../core/ExcelComponent';
import {templateTable} from './table.template';

export class Table extends ExelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['click'],
        });
    }

    toHTML() {
        return templateTable(20);
    }

    onClick(event) {
        console.log(event.target);
    }
}
