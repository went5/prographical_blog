---
template: SinglePost
title: オリジナル投稿
status: Featured / Published
date: '2018-03-27'
featuredImage: >-
  https://lh3.googleusercontent.com/Otu9HLNLb37Tx7A6pYgD1aY_swN3ZMVgFeChdG_f0FfpWq9BHS5x6qzkuYzKxqVHGIdYioYxWSVFtfdn_CY_wnCQt0YW9cLNuJZB_OenQm9H09j27BW1zc3lRXCz8s2B95tbR7wO=
excerpt: >-
  Etiam ac quam eget lectus venenatis ullamcorper sit amet non arcu. Nullam
  interdum arcu vitae augue pulvinar sodales. Sed non dui diam. Quisque lectus
  est, lobortis ac efficitur vitae, posuere a mauris. Phasellus ac dui
  pellentesque, lacinia risus ut, imperdiet eros.
categories: ['unity']
slug: originaltest
meta:
  canonicalLink: ''
  description: test meta description
  noindex: false
  title: test meta title
---
## Build

```csharp
public static void BuildPlayerContent()
        {
            var settings = AddressableAssetSettingsDefaultObject.Settings;
            if (settings == null)
            {
                if (EditorApplication.isUpdating)
                    Debug.LogError("Addressable Asset Settings does not exist.  EditorApplication.isUpdating was true.");
                else if (EditorApplication.isCompiling)
                    Debug.LogError("Addressable Asset Settings does not exist.  EditorApplication.isCompiling was true.");
                else
                    Debug.LogError("Addressable Asset Settings does not exist.  Failed to create.");
                return;
            }

            foreach (AddressableAssetGroup group in settings.groups)
            {
                if (group == null)
                    continue;
                foreach (AddressableAssetEntry entry in group.entries)
                    entry.BundleFileId = null;
            }
            settings.BuildPlayerContentImpl();
        }
```

## Update

```csharp
public static AddressablesPlayerBuildResult BuildContentUpdate(AddressableAssetSettings settings, string contentStateDataPath)
        {
            var cacheData = LoadContentState(contentStateDataPath);
            if (!IsCacheDataValid(settings, cacheData))
                return null;

            s_StreamingAssetsExists = Directory.Exists("Assets/StreamingAssets");
            var context = new AddressablesDataBuilderInput(settings, cacheData.playerVersion);

            Cleanup(!s_StreamingAssetsExists, false);

            SceneManagerState.Record();
            var result = settings.ActivePlayerDataBuilder.BuildData<AddressablesPlayerBuildResult>(context);
            if (!string.IsNullOrEmpty(result.Error)) Debug.LogError(result.Error);
            SceneManagerState.Restore();
            return result;
        }
```
