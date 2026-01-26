import { Component } from '@angular/core';

@Component({
    selector: 'app-target',
    standalone: true,
    template: '<div data-testid="test-component">Target component for rendering</div>',
})
export default class TargetComponent {}
