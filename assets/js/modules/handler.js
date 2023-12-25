---
---

import { AchievementsFactory } from '{{ "assets/js/modules/achievements.js" | relative_url }}';
import { SkillsFactory } from '{{ "assets/js/modules/skills.js" | relative_url }}';
import { StoreFactory } from '{{ "assets/js/modules/local-storage.js" | relative_url }}';

class Handler {
    constructor(selectors) {
        this.selectors = selectors;

        this.achievements = null;
        this.skills = null;
        this.storage = null;
        
        this.sections = Object.freeze({
            achievements: 'achievements',
            quests: 'quests',
            pets: 'pets',
            collections: 'collections'
        });

        this.selectors = {
            'wrappers': {
                'skills': '#skills-wrapper>div'
            }
        };
    }

    init() {
        this.storage = StoreFactory();
        this.skills = SkillsFactory(this.selectors.wrappers.skills, this.onSkillClicked.bind(this));

        return this;
    }

    initSection(section, selectors, data) {
        switch(section) {
            case this.sections.achievements:
                this.achievements = AchievementsFactory(selectors, data, function(){console.log(this)}.bind(this));
                break;
        }

        this[section].update(this.isUnlocked.bind(this));
    }

    isUnlocked(requirements) {
        return this.storage.isUnlocked(requirements);
    }

    onSkillClicked(id) {
        this.storage.toggleComplete('skills', id);

        this.achievements.update(this.isUnlocked.bind(this));
    }
}

export function HandlerFactory() {
    const handler = new Handler();
    return handler.init();
}