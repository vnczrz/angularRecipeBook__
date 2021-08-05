import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'

})

export class HeaderComponent {
    collapsed = true;

    //init event emmiter with @output decorator so that parent component is able to hear "shout"
    @Output() featureSelected = new EventEmitter<string>();
    
    //onSelect is triggerd onClick from header template and fires the emmiter we init above with the feature being selected passed as an arg**
    onSelect(feature: string) {
        this.featureSelected.emit(feature);
    }
}