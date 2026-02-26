import { TestBed } from '@angular/core/testing';
import { beforeEach, expect, it, describe } from 'vitest';
import { AppComponent } from './app.component';


describe.only('App', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
