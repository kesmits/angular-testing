import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { HomeComponent } from './home.component';


describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeComponent],
        })
            .compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(
        `should call "resetElements" and "resetPositions" on calling "resetClick"`,
        () => {
            const resetElementsSpy = vi.spyOn(component as any, 'resetElements');
            const resetPositionsSpy = vi.spyOn(component as any, 'resetPositions');

            component.resetClick();

            expect(resetElementsSpy).toHaveBeenCalledTimes(1);
            expect(resetPositionsSpy).toHaveBeenCalledTimes(1);
        },
    );
});
