const firebase = {
    analytics: jest.fn(() => ({
        logEvent: jest.fn(),
        setAnalyticsCollectionEnabled: jest.fn()
    }))
};

export default firebase;

